import Hyprland from "gi://AstalHyprland"
import {bind} from 'astal'
import {Gtk} from 'astal/gtk3'

const hyprland = Hyprland.get_default()

const focusedWorkspace = bind(hyprland,"focusedWorkspace")

function ChangeWorkspace (index = 0) {
    if (focusedWorkspace.get().id != index+1) {
      hyprland.dispatch("workspace",`${index+1}`)
    }
}

function Workspaces() {
    return <eventbox className={"wsEventBox"} onScroll={(obj,event) => {
        if (event.delta_y > 0) {
            if (hyprland.focusedWorkspace.id == 9) {
                hyprland.dispatch("workspace", `1`)
            } else {
                hyprland.dispatch("workspace", `${hyprland.focusedWorkspace.id + 1}`)
            }
        } 
        else {
            if (hyprland.focusedWorkspace.id == 1) {
                hyprland.dispatch("workspace", `9`)
            } else {
                hyprland.dispatch("workspace", `${hyprland.focusedWorkspace.id - 1}`)
            }
        }
    }}>
        <box className={"barSecondBackground"} spacing={4}>
        {Array.from({length: 9}, (_, index) => {
            return (<button 
            className={focusedWorkspace.as(fw => fw.id == index+1 ? "wsButton focused" : "wsButton")}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            onClick={() => {
                ChangeWorkspace(index)
            }}>
                <label label={`${index + 1}`} justifyFill={true} justify={Gtk.Justification.CENTER}></label>
            </button>)       
        })}
        </box>
    </eventbox>
}

export {
    Workspaces
}