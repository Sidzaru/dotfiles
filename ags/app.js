import {App, Astal} from 'astal/gtk3'
import {exec, monitorFile} from 'astal'
import Bar from './widgets/bar/bar'
import Notifications from './widgets/notifications/notifications'


if (!(exec("ls -l").includes("cache"))) {
  exec("mkdir ./cache/")
}

exec("sass ./style.scss ./cache/style.css")

App.start({
    css : "./cache/style.css",

    main() {
        Bar(App)
        Notifications(App).hide()
    }
})

function ToggleWindow(name) {
  App.toggle_window(name)
}

monitorFile(
    `./widgets/notifications/notifications.scss`,
  
      function() {
        exec("sass ./style.scss ./cache/style.css")
        
        App.reset_css()
        App.apply_css('./cache/style.css')
        console.log('changed scss')
    },
  )

export default ToggleWindow