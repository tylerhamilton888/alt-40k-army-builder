import { useEffect, useState } from "react"
import { EmployeeViews } from "./EmployeeViews.jsx"
import { CustomerViews } from "./CustomerViews.jsx"



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localgameUser = localStorage.getItem("game_user")
    const gameUserObject = JSON.parse(localgameUser)

    setCurrentUser(gameUserObject)
  }, [])

  return currentUser.isStaff ? (
    <EmployeeViews currentUser={currentUser} /> 
  ) : ( 
  <CustomerViews currentUser={currentUser}/>
  )
}