# ScriptRunnerSingletonPattern Implementation Notes

## STOP Behaviour in Godot

Godot applications when 'stopped' via STOP button (Godot editor or IDE) will not run Nodes' _`ExitTree` callback.
Nodes will also receive no notifications, none. The process just exits like hitting the STOP button of the debugger.

This may be unexpected behaviour for Unity developers. Unity guarantees that OnDestroy runs when stopping playmode. 
