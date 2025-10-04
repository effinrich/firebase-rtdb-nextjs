import { ref, push, set, get, update, remove } from 'firebase/database'
import { database } from '@/lib/firebase'
import { User, UserFormData } from '@/types/user'
import { fetchWeatherData } from './weatherService'

const USERS_PATH = 'users'

export const fetchUsers = async (): Promise<Array<User>> => {
  const usersRef = ref(database, USERS_PATH)
  const snapshot = await get(usersRef)

  if (!snapshot.exists()) {
    return []
  }

  const usersData = snapshot.val()
  return Object.keys(usersData).map(key => ({
    id: key,
    ...usersData[key]
  }))
}

export const createUser = async (formData: UserFormData): Promise<void> => {
  const weatherData = await fetchWeatherData(formData.zipCode)

  const newUserRef = push(ref(database, USERS_PATH))
  const userData = {
    name: formData.name,
    zipCode: formData.zipCode,
    latitude: weatherData.coord.lat,
    longitude: weatherData.coord.lon,
    timezone: weatherData.timezone
  }

  await set(newUserRef, userData)
}

export const updateUser = async (
  id: string,
  formData: UserFormData,
  currentZipCode: string
): Promise<void> => {
  const userRef = ref(database, `${USERS_PATH}/${id}`)

  if (formData.zipCode !== currentZipCode) {
    const weatherData = await fetchWeatherData(formData.zipCode)
    await update(userRef, {
      name: formData.name,
      zipCode: formData.zipCode,
      latitude: weatherData.coord.lat,
      longitude: weatherData.coord.lon,
      timezone: weatherData.timezone
    })
  } else {
    await update(userRef, {
      name: formData.name,
      zipCode: formData.zipCode
    })
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  const userRef = ref(database, `${USERS_PATH}/${id}`)
  await remove(userRef)
}
