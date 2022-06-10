export default function formatDate(date) {
    
  // const formatted = new Date(date).toISOString().slice(0, 10)
  //   return formatted

    return new Date(date).toLocaleDateString('en-GB')

}


export const formatDateForState = (date) => {

  // this will return 2022-06-09T19:00:00.000Z slice(0,10) return only 10 first digit

  return new Date(date).toISOString().slice(0, 10)
  // return new Date(date).toLocaleDateString('en-US',
  // { year: "numeric", month: "2-digit", day: "2-digit" })


}
