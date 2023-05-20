
interface NotificationProps {
    message: string,
    type: 'success' | 'error' | 'warning'| 'default'
}
const Notification = ({message, type}:NotificationProps) => {
    const classNames = {
        success: "text-green-500",
        warning: "text-green-500",
        error: "text-green-500",
        default: "text-green-500",
    }
  return (
    <div className={classNames[type]}>{message}</div>
  )
}

export default Notification