# TechTalk.md

# Description

LunyScript provides a uniform API to program C# game engines' ubiquitous features, whose editor design tools do the heavy lifting.

A 3D clone of 'Vampire Survivors' or a '3D Product Configurators' could be entirely programmed in LunyScript. Which engine hardly matters.

## Portable Core + Scripting API

The portable **LunyCore** bridges engines' already similar Scene Graphs, Object Lifecycles, Asset Types to a single, unified interface with behavioral guarantees. This enables developing cross-engine frameworks.

The declarative, natural language **LunyScript** API is suitable for making small games, minimal interactive experiences, and prototypes. It is easy to extend via C# extension methods. Semantically equivalent in C#, Lua and other languages.

## Details

A functional reactive event system drives built-in coroutines, behavior trees, statemachines - standard gameplay programming patterns proven in production for decades.

Targetting beginners, educators and designers, friendly natural language is key to adoption: `Run.InOrder` and `Run.AtOnce`, `IfAny` and `IfAll`, `Asset["meshes/cube"]` and `Object["Player"]`.

Code completion friendly, it is intuitive to pick up, provides immediate results, causes less friction and failure points compared to visual scripting and imperative coder.


## LunyScript Examples

LunyScript C# code shall look something like this, and will be available in Lua too:

    public class Police : LunyScript
    {
        public Police()
        {
            When(Collision.Enter("ball"), Run.InOrder(
                Audio.Play(),
                Prefab.Spawn("GoldCube").Times(3),
                Variable.Global.Increment("Score"),
                Collision.Other.SendMessage("EnableGlow"),
                Wait.Seconds(1),
                Collision.Other.SendMessage("DisableGlow"),
            );
        
            // user enters menu
            When.Input(Key.Escape, ShowMenu());
            When(Menu.Button.Pressed("Restart"), Run.AtOnce(
                Audio.Play(button_click),
                Variable.Global.Set("Score", 0),
                Stage.Reload()
            );
        
            // police car signal lights
            var police = SceneGraph["PoliceCar"]; // "Find" operation internally cached
            Forever(Run.InOrder(
                police.Enable("RedLight"), police.Disable("BlueLight"), Wait.Seconds(0.1),
                police.Disable("RedLight"), police.Enable("BlueLight"), Wait.Seconds(0.12)
            );
        }
    }

## Technical Mumbo-Jumbo

The core frameworks makes the reasonable assumption that:

- there is a scene graph of "things" with "more things" in them
    - the expectation is that there are "objects" that have a list of "components"
    - Unity has a graph of GameObjects each with a list of components
    - Godot's pure Node graph maps easily: Graph of GameObject nodes, each with a list of Component nodes (its children)
    - Unreal's nested component graph maps in similar fashion
- you don't need to care what these "things" actually are:
    - The figurative "GetComponent<T>()" works like this:
    - Unity: returns Component<T> on GameObject
    - Godot: returns child Node matching T
    - Unreal: returns child UComponent matching T in AActor's component graph
- engine objects' lifecycle events are intercepted, queued, and forwarded in deterministic fashion
    - levels minor inconsistencies between engines' order of events
    - removes any non-deterministic behaviours in some events of some engines
- users will want to bypass the bridge and write direct-to-engine calls for best efficiency: simply pass the native reference, method overloading does the rest.
- users will want to configure runtime behaviour, ie disable No-Null design if exceptions are preferred
- users want to hot-reload script changes at runtime, even in builds (modding!)
- users will NOT want to feel forced into using a particular language.
    - Script API is expressly designed to adapt almost identically to any common game engine language
    - Default is engine's native language. Lua is for learners and designers.
- users will need to instrument and debug the adapters and core abstractions easily:
    - Minimal pure C# 9 code, unit tested core. No emit, reflection or compiler magic.
- Portable behaviour contracts are possible, precise outcomes aren't (physics!):
    - Throw object in direction: check. Comes to rest at precise location in same time: non-goal.
