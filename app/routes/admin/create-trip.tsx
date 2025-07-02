import React, { useState } from 'react'
import { Header } from 'components'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import type { Route } from './+types/create-trip'

type Country = {
  name: string
  flagUrl: string
  value: string
}

type TripFormData = {
  country: string
  // add other fields if needed
}

export const loader = async (): Promise<Country[]> => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags'
  )
  const data = await res.json()

  if (Array.isArray(data)) {
    return data.map((country: any) => ({
      name: country.name.common,
      flagUrl: country.flags?.png || '',
      value: country.name.common,
    }))
  }
  return []
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[]

  const handleChange = (key: keyof TripFormData, value: string | number) => {
  
  }

  const countryData = countries?.map((c) => ({
    text: c.name,
    value: c.value,
    flagUrl: c.flagUrl,
  }))

  const itemTemplate = (data: { text: string; flagUrl: string }) => (
    <div className="flex items-center gap-2">
      <img
        src={data.flagUrl}
        alt={data.text}
        className="w-6 h-4 object-cover"
      />
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
                const query = e.text.toLowerCase()
                const filtered = countries
                  .filter((country) =>
                    country.name.toLowerCase().includes(query)
                  )
                  .map((country) => ({
                    text: country.name,
                    value: country.value,
                    flagUrl: country.flagUrl,
                  }))
                e.updateData(filtered)
              }}
            />
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip
