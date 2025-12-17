# ScriptRunnerSingletonPattern Implementation Notes

## STOP Behaviour in Godot

Godot applications when 'stopped' via STOP button (Godot editor or IDE) will not run Nodes' _ExitTree callback and there will also be no notication posted. The process simply halts.

This may be unexpected behaviour for Unity developers, since Unity does call OnDestroy when stopping playmode.
