import { Grid } from 'react-loader-spinner'

export default function Loader() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
    <Grid
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="grid-loading"
radius="12.5"
wrapperStyle={{}}
wrapperClass="grid-wrapper"
/></div>
    </>
  )
}
