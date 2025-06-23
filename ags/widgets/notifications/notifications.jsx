import { Astal, Gtk } from 'astal/gtk3'
import AstalNotifd from 'gi://AstalNotifd?version=0.1'

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

const notifd = AstalNotifd.get_default()
const GtkBuilder = Gtk.Builder.new()

let notificationBox

function updateNotificationsClass() {
  const children = notificationBox.get_children()

  children.forEach(child => {
    print(child)
    child.toggleClassname('notificationTextF', false)
  })

  if (children.length > 0) {
    children[0].toggleClassName('notificationTextF',true)
  }
}

notifd.connect("notified", (_, id) => {
    const n = notifd.get_notification(id)

    const dateTime = new Date(n.time * 1000).toLocaleTimeString('en-US', { hour12: false })

    notificationBox.add_child(GtkBuilder,
      <eventbox className={`notificationButton`} onClick={(btn, event) => {
        notificationBox.remove(btn)
        updateNotificationsClass()
      }}>
        <box vertical={true}>
          <label className={`notificationText`}
            truncate={true}
            lines={2}
            wrap={true}
            wrapMode={Gtk.WrapMode.CHAR}
            label={n.appName + ' : ' + n.summary + ' ' + n.body}
          />
          <label className={'notificationTime'}
            truncate={true}
            halign={Gtk.Align.END}
            lines={1}
            wrap={true}
            wrapMode={Gtk.WrapMode.CHAR}
            label={dateTime}
          />
        </box>
          
      </eventbox>,
      null
    )
})

function sendNotification() {
  notifications.push()
}

function Notifications(application) {
  return (
    <window
      application={application} 
      className={"notifications"}
      name={"notifications"}
      exclusivity={Astal.Exclusivity.NORMAL} 
      anchor={TOP|LEFT|BOTTOM}      
      margin={4|0|0|4}>        
        <box vertical={true} className={"notificationsBox"}>
          <box homogeneous={true}>
            <label label={"Notifications"} className={"notificationsTitle"} />
            <button className={"notificationsDeleteButton"} onClick={() => {
              notificationBox.set_children([])
            }}>
              <label valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} label="Clear Notifications"></label>
            </button>
          </box>
          <scrollable expand={true} 
                      className={"notificationsScrollable"} 
                      vscroll={Gtk.PolicyType.AUTOMATIC} 
                      hscroll={Gtk.PolicyType.NEVER}
                      heightRequest={100}>
                      <box vertical={true} setup={(nBox) => {
                        notificationBox = nBox
                      }}/>
                      </scrollable>
        </box>
    </window>
  )
}

export default Notifications
