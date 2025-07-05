import { useState } from 'react'
import { Header } from 'components'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import type { Route } from './+types/create-trip'
import { comboBoxItems, selectItems } from '~/constants'
import { cn, formatKey } from 'lib/utils'
import { LayerDirective, LayersDirective, MapsComponent } from '@syncfusion/ej2-react-maps'
import { world_map } from '~/constants/world_map'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { account } from 'appwrite/client'
import { useNavigate } from 'react-router'

interface Country {
  name: string
  flagUrl: string
  value: string
}

interface TripFormData {
  country: string
  duration: number
  travelStyle: string
  interest: string
  budget: string
  groupType: string
  [key: string]: string | number
}

interface CreateTripResponse {
  id?: string
}

// Loader: get countries with flags
export const loader = async (): Promise<Country[]> => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags')
  const data = await res.json()

  return Array.isArray(data)
    ? data.map((country: any) => ({
        name: country.name.common,
        flagUrl: country.flags?.png || '',
        value: country.name.common
      }))
    : []
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[]
  const navigate = useNavigate()

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || '',
    travelStyle: '',
    interest: '',
    budget: '',
    groupType: '',
    duration: 0
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.country || !formData.travelStyle || !formData.interest || !formData.budget || !formData.groupType) {
      setError('Please provide values for all fields')
      setLoading(false)
      return
    }
    if (formData.duration < 1 || formData.duration > 10) {
      setError('Duration must be between 1 and 10 days')
      setLoading(false)
      return
    }

    try {
      const user = await account.get()
      if (!user?.$id) {
        setError('User not authenticated')
        setLoading(false)
        return
      }

      const response = await fetch('/api/create-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.$id
        })
      })

      if (!response.ok) {
        console.error('API returned error:', response.status)
        setError('Failed to generate trip')
        return
      }

      const result: CreateTripResponse = await response.json()
      if (result?.id) {
        navigate(`/trips/${result.id}`)
      } else {
        setError('Failed to generate trip')
      }
    } catch (e) {
      console.error('Error generating the trip:', e)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const countryData = countries.map(c => ({
    text: c.name,
    value: c.value,
    flagUrl: c.flagUrl
  }))

  const mapData = [
    {
      country: formData.country,
      color: '#EA382E'
      // optionally add coordinates if you fetch them
    }
  ]

  const itemTemplate = (data: { text: string; flagUrl: string }) => (
    <div className="flex items-center gap-2">
      <img src={data.flagUrl} alt={data.text} className="w-6 h-4 object-cover" />
      <span>{data.text}</span>
    </div>
  )

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header title="Add a New Trip" description="View and Edit AI Generated travel plans" />
      <section className="mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto">
        <form className="trip-form" onSubmit={handleSubmit}>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block mb-1 font-medium">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder="Select a country"
              itemTemplate={itemTemplate}
              popupHeight="300px"
              allowFiltering
              className="combo-box"
              change={(e: { value?: string }) => e.value && handleChange('country', e.value)}
              filtering={(e: any) => {
                const query = e.text?.toLowerCase() || ''
                const filtered = countries
                  .filter(c => c.name.toLowerCase().includes(query))
                  .map(c => ({ text: c.name, value: c.value, flagUrl: c.flagUrl }))
                e.updateData(filtered)
              }}
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block mb-1 font-medium">Duration</label>
            <input
              id="duration"
              type="number"
              name="duration"
              placeholder="Enter number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange('duration', Number(e.target.value) || 0)}
            />
          </div>

          {/* Other select items */}
          {selectItems.map(key => (
            <div key={key}>
              <label htmlFor={key} className="block mb-1 font-medium">{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map(item => ({ text: item, value: item }))}
                fields={{ text: 'text', value: 'value' }}
                placeholder={`Select ${formatKey(key)}`}
                popupHeight="300px"
                className="combo-box"
                allowFiltering
                change={(e: { value?: string }) => e.value && handleChange(key, e.value)}
                filtering={(e: any) => {
                  const query = e.text?.toLowerCase() || ''
                  e.updateData(comboBoxItems[key]
                    .filter(item => item.toLowerCase().includes(query))
                    .map(item => ({ text: item, value: item })))
                }}
              />
            </div>
          ))}

          {/* World map */}
          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{ colorValuePath: 'color', fill: '#E5E5E5' }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className='bg-gray-200 h-px w-full' />

          {error && <div className='error'><p>{error}</p></div>}

          <footer className='px-6 w-full'>
            <ButtonComponent type='submit' className='button-class !h-12 !w-full' disabled={loading}>
              <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn('size-5', { 'animate-spin': loading })} />
              <span className='p-16-semibold text-white'>{loading ? 'Generating...' : 'Generate Trip'}</span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip
