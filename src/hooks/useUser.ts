import { useState } from "react"

export default () => {
  const [user, SetUser] = useState<Moretime.User>()

  return {
    user
  }
}
