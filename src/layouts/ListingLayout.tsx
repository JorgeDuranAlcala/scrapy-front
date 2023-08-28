import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

const allowedRoutes = ['idealista', 'fotocasa', 'yaencontre']

type ListingLayout = {
  children: JSX.Element
}

const ListingLayout = ({children}: ListingLayout) => {
  const router = useRouter()
  const listing = router.query.id

  if(!router.isReady) return <Spinner/>

  if(!allowedRoutes.includes(listing as string)){
    router.push("/404")
    return <></>
  }

  return children
}

export default ListingLayout
