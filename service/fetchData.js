//./service/fetchData.js
import { db } from "./firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export const fetchData = async () => {
  try {
    const q = query(collection(db, "markets"), where("crop", "==", "maize"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
