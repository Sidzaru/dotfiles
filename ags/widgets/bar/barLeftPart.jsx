import { bind, Variable } from "astal"
import Mpris from 'gi://AstalMpris'
import ToggleWindow from '../../app'
import { Gtk } from 'astal/gtk3'

const mpris = Mpris.get_default()

function Player(player)  {
    const isPlaying = bind(player, "playbackStatus").as(s => {
        if(s === Mpris.PlaybackStatus.PLAYING) {
            return "󰎇 "+player.title
        } else if (s === Mpris.PlaybackStatus.PAUSED){ 
            return "󰏤 "+player.title 
        } else  return ""
    })

    return <eventbox 
        className={"barPlayerTitle"}
        onClick={() => {player.play_pause()}}>
        <label className={"barPlayerTitleLabel"} truncate={true} label={isPlaying}/>
    </eventbox>
}

function MusicTitle() {
    return bind(mpris,'players').as(players => {if (players.length != 0) {return players.map(Player)} else {return <label />}})
}

function Resources() {
    const cpuVariable = Variable().poll(2000,"top -b -n 1",(out) => {
        return (+(out.split('\n').find(line => line.includes('Cpu(s)'))?.split(/\s+/)[1].replace(',','.'))/100).toFixed(2)
    })

    const memVariable = Variable().poll(5000,"top -b -n 1",(out) => {
        var mem = out.split('\n').find(line => line.includes('Mem :')).split(/\s+/)
        return (1-(((+mem[5])+(+mem[9]))/mem[3])).toFixed(2)
    })

    return <box halign={Gtk.Align.FILL} spacing={10} homogeneous={true}>
        <box spacing={10} halign={Gtk.Align.START}>
            <circularprogress className={"barCircularProgress"} value={bind(cpuVariable)} />
            <label label={''} className={"barCircularProgressIcon"} />   
            <label label={bind(cpuVariable).as(value => {return (+value*100).toFixed(0)+`%`})} className={"barCircularProgressValue"}/>
        </box>
        <box spacing={10} halign={Gtk.Align.START}>
            <circularprogress className={"barCircularProgress"} value={bind(memVariable)} />
            <label label={""} className={"barCircularProgressIcon"} />
            <label label={bind(memVariable).as(value => {return `${(+value*100).toFixed(0)}%`})} className={"barCircularProgressValue"} />
        </box>
    </box>    
}

function Notification() {
    return <button
        halign={Gtk.Align.FILL}
        onClick={() => {ToggleWindow('notifications')}} 
        label={""}
        className={"barSideWindowButton"}
    />
}

function LeftPart() {
    return <centerbox spacing={20}>
        {Notification()}
        {Resources()}
        {MusicTitle()}
    </centerbox>
}

export {
    LeftPart
}
