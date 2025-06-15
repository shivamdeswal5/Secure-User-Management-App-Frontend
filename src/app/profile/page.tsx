import ProfileComponent from '../../components/profile'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get('accessToken')

  if (!accessToken) {
    redirect('/login') 
  }
  return <ProfileComponent />
}