import { Astal } from 'astal/gtk3'
import { Workspaces } from './workspaces'
import { RightPart } from './barRightPart'
import { LeftPart } from './barLeftPart'

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

function Bar(application) {
  return (
    <window 
      application={application}
      className={"bar"}
      name={"bar"}
      exclusivity={Astal.Exclusivity.EXCLUSIVE} 
      anchor={TOP|LEFT|RIGHT}
      margin={4|0|0|4}>
      <centerbox homogeneous={true} spacing={10}>
        {LeftPart()}
        {Workspaces()}
        {RightPart()}
      </centerbox>
    </window>
  )
}


export default Bar