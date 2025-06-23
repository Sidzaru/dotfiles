import Hyprland from "gi://AstalHyprland"
import { bind, Variable } from "astal"
import {Gtk} from 'astal/gtk3'

const hyprland = Hyprland.get_default()

function ActiveWindow() {
    return <label
        className={"barActiveWindow"}
        truncate={true}
        label={bind(hyprland, "focusedClient").as(fc => {return fc.title})}>
    </label>
}

function DateTime() {
    const time = Variable('').poll(1000, 'date "+%H:%M"')
    const date = Variable('').poll(10000, 'date "+%d %A"')
  
    return <box spacing={10} halign={Gtk.Align.CENTER}> 
        <label justify={Gtk.Justification.RIGHT} className={"barTimeIcon"} label={""}></label>
        <label justify={Gtk.Justification.RIGHT} className={"barTime"} label={bind(time)}></label>
        <label justify={Gtk.Justification.RIGHT} className={"barDate"} label={bind(date)}></label>
    </box>
}

// TODO Make color changer with hellwall
function Menu() {
    return <button
        halign={Gtk.Align.FILL}
        label={"󰣇"}
        className={"barSideWindowButton"}
    />
}

function RightPart() {
    return <centerbox spacing={20}>
        {ActiveWindow()}
        {DateTime()}
        {Menu()}
    </centerbox>
}

export {
    RightPart
}