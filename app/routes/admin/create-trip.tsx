
import { Header } from 'components'
import {ComboBoxComponent} from '@syncfusion/ej2-react-dropdowns'
import type { Route } from './+types/create-trip';

export const loader = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    return data;
}

const CreateTrip = ({loaderData}: Route.ComponentProps) => {
    const handleSubmit = async () => {
        const countries = loaderData as Country[];
    console.log(countries)
    }
  return (
   <main className='flex flex-col gap-10 pb-20 wrapper'>
    <Header
    title='Add a New Trip'
    description='View and Edit AI Generated travel plans'/>
      
      <section className='mt-2.5 w-full max-w-3xl px-4 lg:px-8 mx-auto'>

        <form className='trip-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="contry">
                    country
                </label>
                 <ComboBoxComponent 
                  id='country'
                  dataSource={['title', 'title1']}
                 />
            </div>

        </form>
          
      </section>
   </main>
  )
}

export default CreateTrip
