import { useStore } from "../store/store_4"
import { useEffect } from "react"

const Meals = () => {
const { meals , searchQuery, setMeals, setSearchQuery} = useStore()

useEffect(() => {
    const fetchMeal = async() => {
        try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")

          const data = await response.json()
          setMeals(data.meals)
        } catch (error) {
            console.log(error)
        }
    }

    fetchMeal()
},[setMeals])

const filteredMeals = meals.filter((meal) => meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">SeaFood Gang</h1>
        <input type="text" placeholder="Search for a Meal.." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="shadow-lg p-4 bg-gray-200 focus:outline-none rounded-lg" />

        <div>
            {filteredMeals.length > 0 ? (
                filteredMeals.map(meal => (
                    <div key={meal.idMeal}>
                        <h2>{meal.strMeal}</h2>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </div>
                ))
            ) : (
                <p className="mt-3">No Meals Found</p>
            )}
        </div>
    </div>
  )
}
export default Meals