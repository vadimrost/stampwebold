import { createUserWithEmailAndPassword } from 'firebase/auth'
import { GeoPoint, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useStore from '../store'
import { auth, db } from '../utils/firebase'
import loader from './../assets/loader.svg'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const Page4 = ({ setPage }) => {
  const data = useStore((state) => state.data)
  const [loading, setLoading] = useState(false)
  const setData = useStore((state) => state.setInfoData)
  const removeData = useStore((state) => state.removeData)
  const navigate = useNavigate()

  const fileUpload = (blob) => {
    return new Promise(async (resolve, reject) => {
      const storage = getStorage()
      const storageRef = ref(storage, `/restaurentImages/${blob.name}`)

      try {
        const snapshot = await uploadBytes(storageRef, blob)
        console.log('Uploaded a blob or file!')

        const uploadTask = uploadBytesResumable(storageRef, blob)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            // Other snapshot state handling
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              console.log('Download URL:', downloadURL)
              resolve(downloadURL)
            } catch (error) {
              console.log(error)
              reject(error)
            }
          }
        )
      } catch (error) {
        console.error('Error uploading:', error)
        reject(error)
      }
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const userCredential = await createUserWithEmailAndPassword(auth, data.info.email, data.password.password)
      const user = userCredential.user // Retrieve the user object from the userCredential

      // Deep copy of data to modifiedData
      let modifiedData = JSON.parse(JSON.stringify(data))

      if (data.info.imageBlob) {
        let restaurantImage = await fileUpload(data.info.imageBlob)
        modifiedData.info.imageUrl = restaurantImage
        modifiedData.info = {
          firstName: modifiedData.info.firstName,
          lastName: modifiedData.info.lastName,
          displayName: modifiedData.info.displayName,
          imageUrl: restaurantImage,
          phoneNumber: modifiedData.info.phoneNumber,
          email: modifiedData.info.email
        }
      }

      if (data.card.logo.type === 'custom') {
        let cardImage = await fileUpload(data.card.logo.blob)
        modifiedData.card.logo = {
          type: 'custom',
          imageUrl: cardImage
        }
      }

      const usersCollection = collection(db, 'web-users')

      const userDocRef = user ? doc(usersCollection, user.uid) : null
      const promises = []

      if (userDocRef) {
        const { lat, lng, ...restAddress } = modifiedData.address

        // Creating GeoPoint object for the address
        const addressGeoPoint = new GeoPoint(lat, lng)

        // Adding the address with GeoPoint to the userDoc
        let t = {
          ...restAddress, // Other address properties
          location: addressGeoPoint // Adding GeoPoint to the address
        }
        const userDoc = {
          ...t,
          ...modifiedData.info
        }
        promises.push(setDoc(userDocRef, userDoc))

        // Add subcollection for the card data
        const cardSubCollection = collection(userDocRef, 'card')

        const cardDoc = {
          cardBackground: modifiedData.card.cardBackground,
          stampBackground: modifiedData.card.stampBackground,
          cardText: modifiedData.card.cardText,
          noOfStamps: modifiedData.card.noOfStamps,
          stamp: modifiedData.card.stamp,
          logo: modifiedData.card.logo,
          reviews: []
        }

        promises.push(addDoc(cardSubCollection, cardDoc))
      }

      await Promise.all(promises)
      navigate('/login', { replace: true })
      removeData()
      toast.success('Account created successfully')
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Account with this email already exists')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="mt-8 flex  flex-col items-start">
        <h1 className="text-2xl font-semibold">Account Detail</h1>
        <h1 className="mt-10 text-xl font-medium">Personal Information</h1>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">First Name</h1>
          <p className="font-semibold ">{data?.info?.firstName}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Last Name</h1>
          <p className="font-semibold ">{data?.info?.lastName}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Display Name</h1>
          <p className="font-semibold ">{data?.info?.displayName}</p>
        </div>

        <h1 className="mt-10 text-xl font-medium">Contact Information</h1>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Phone Number</h1>
          <p className="font-semibold ">{data?.info?.phoneNumber}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Email Address</h1>
          <p className="font-semibold ">{data?.info?.email}</p>
        </div>

        <h1 className="mt-10 text-xl font-medium">Address</h1>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Address Line</h1>
          <p className="font-semibold ">{data?.address?.addressline}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Address Line 2</h1>
          <p className="font-semibold ">{data?.address?.addressline2}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">City</h1>
          <p className="font-semibold ">{data?.address?.city}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">State</h1>
          <p className="font-semibold ">{data?.address?.state}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <h1 className="text-[#636363]">Zip</h1>
          <p className="font-semibold ">{data?.address?.zip}</p>
        </div>
      </div>

      <div className="my-8  flex w-full items-center justify-between">
        <h1 onClick={() => setPage(3)} className="cursor-pointer font-bold text-[#4D69FA]">
          Previous
        </h1>
        <button disabled={loading} onClick={handleSubmit} type="submit" className="self-end rounded-xl bg-[#EDF0FF] px-[2rem] py-[6.5px] font-bold text-[#4D69FA]">
          {loading ? <img className="h-[25px] w-[25px]" src={loader} alt="loader" /> : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default Page4
