// app/edit-profile/page.tsx
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import EditProfileComponent from '../../components/edit-profile'

export default async function EditProfilePage() {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get('accessToken')

  if (!accessToken) {
    redirect('/login') 
  }

  return <EditProfileComponent />
}
