import { useState } from 'react'
import { Header } from 'components'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import type { Route } from './+types/create-trip'
import { comboBoxItems, selectItems } from '~/constants'
import { formatKey } from 'lib/utils'
import { Coordinate, LayerDirective, LayersDirective, MapsComponent } from '@syncfusion/ej2-react-maps'
import { world_map } from '~/constants/world_map'

type Country = {
  name: string
  flagUrl: string
  value: string
}

type TripFormData = {
  country: string
  duration: number
  [key: string]: string | number
}

// ✅ Loader: get countries with flags
export const loader = async (): Promise<Country[]> => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags'
  )
  const data = await res.json()

  if (Array.isArray(data)) {
    return data.map((country: any) => ({
      name: country.name.common,
      flagUrl: country.flags?.png || '',
      value: country.name.common
    }))
  }
  return []
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[]

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || '',
    travelStyle: '',
    interest: '',
    budget: '',
    groupType: '',
    duration: 0
  })

  // ✅ handleChange keeps formData updated
  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // For country ComboBox
  const countryData = countries.map((c) => ({
    text: c.name,
    value: c.value,
    flagUrl: c.flagUrl
  }))

  const mapData = [
      {
        country: formData.country,
        coloe: '#EA382E',
        Coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
      }
  ]

  // Item template for country (flag + name)
  const itemTemplate = (data: { text: string; flagUrl: string }) => (
    <div className="flex items-center gap-2">
      <img src={data.flagUrl} alt={data.text} className="w-6 h-4 object-cover" />
      <span>{data.text}</span>
    </div>
  )

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and Edit AI Generated travel plans"
      />
      <section className="mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto">
        <form className="trip-form" onSubmit={(e) => e.preventDefault()}>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block mb-1 font-medium">
              Country
            </label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder="Select a country"
              itemTemplate={itemTemplate}
              popupHeight="300px"
              allowFiltering
              className="combo-box"
              change={(e: { value?: string }) => {
                if (e.value) {
                  handleChange('country', e.value)
                }
              }}
              filtering={(e: any) => {
                const query = e.text?.toLowerCase() || ''
                const filtered = countries
                  .filter((country) =>
                    country.name.toLowerCase().includes(query)
                  )
                  .map((country) => ({
                    text: country.name,
                    value: country.value,
                    flagUrl: country.flagUrl
                  }))
                e.updateData(filtered)
              }}
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block mb-1 font-medium">
              Duration
            </label>
            <input
              id="duration"
              type="number"
              name="duration"
              placeholder="Enter number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) =>
                handleChange('duration', Number(e.target.value))
              }
            />
          </div>

          {/* Other select items */}
          {selectItems?.map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block mb-1 font-medium">
                {formatKey(key)}
              </label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key]?.map((item) => ({
                  text: item,
                  value: item
                }))}
                fields={{ text: 'text', value: 'value' }}
                placeholder={`Select ${formatKey(key)}`}
                popupHeight="300px"
                className="combo-box"
                change={(e: { value?: string }) => {
                  if (e.value) {
                    handleChange(key, e.value)
                  }
                }}
                // Add filtering only if this key === 'country' (unlikely here)
                filtering={
                  key === 'country'
                    ? (e: any) => {
                        const query = e.text?.toLowerCase() || ''
                        const filtered = countries
                          .filter((country) =>
                            country.name.toLowerCase().includes(query)
                          )
                          .map((country) => ({
                            text: country.name,
                            value: country.value,
                            flagUrl: country.flagUrl
                          }))
                        e.updateData(filtered)
                      }
                    : undefined
                }
                // Add itemTemplate only for country
                itemTemplate={key === 'country' ? itemTemplate : undefined}
              />
            </div>
          ))}

          <div>
             <label htmlFor="location">
               Location on the world map
             </label>
              <MapsComponent>
                    <LayersDirective>
                         <LayerDirective
                         dataSource={mapData}
                         shapeData={world_map}
                         />
                    </LayersDirective>
              </MapsComponent>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip
