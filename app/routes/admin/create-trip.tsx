import { Header } from 'components'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import type { Route } from './+types/create-trip';

// ✅ Add type
type Country = {
  name: string;
  Coordinate: number[];
  value: string;
  openstreetmap?: string;
};

// ✅ Loader
export const loader = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=flag,name,latlng,maps')
  const data = await res.json();

  console.log("countries data:", data);

  return Array.isArray(data)
    ? data.map((country: any) => ({
        name: country.flag + " " + country.name.common,
        Coordinate: country.latlng,
        value: country.name.common,
        openstreetmap: country.maps?.openStreetMap,
    }))
    : [];
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
     const handleSubmit = async () => {}
  const countries = loaderData as Country[];

  const countryData = countries?.map((country) => ({
     text: country.name,
     value: country.value,
  }))

 

  return (
    <main className='flex flex-col gap-10 pb-20 wrapper'>
      <Header
        title='Add a New Trip'
        description='View and Edit AI Generated travel plans'
      />
      <section className='mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto'>
        <form className='trip-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id='country'
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder="Select a country"
              className='combo-box'
            />
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip;
