# ExtendingLunyScriptApi.md

To enable users to write their own APIs that feel "native" within the LunyScript fluent environment, there are several architectural patterns available. 

Here are the recommended options:

## 1. Game-Specific Base Class 
### Most native feel; Recommended for Students/Teams

   The most "native" feel is achieved by defining a project-specific `LunyScript` base class. This allows you to provide properties like MyApi that show up in Intellisense just like When or Object.

    // In your game project
    public abstract class GameScript : LunyScript
    {
       public MyApi MyApi => new(this);
    }
    
    public readonly struct MyApi
    {
        private readonly LunyScript _script;
        internal MyApi(LunyScript script) => _script = script;
    
        public IScriptActionBlock DoSomething() => DoSomethingBlock.Create();
    }
    
    // Usage in a script
    public class PlayerScript : GameScript
    {
        public override void Build()
        {
            OnUpdate(MyApi.DoSomething());
        }
    }

- Pros: Perfectly matches the native API feel; full Intellisense support.
- Cons: Requires users to inherit from your `GameScript` instead of the base LunyScript. Scripts not portable to projects without `GameScript`.

## 2. Static Factory Classes
### Cleanest Syntax, Least Discoverable, Clutters Intellisense; Okay for Sharing

   Many of the built-in API blocks (like Debug.LogInfo) don't actually require the LunyScript instance at creation time because they receive the ILunyScriptContext at execution time. You can exploit this to create a "Global" API feel.

    public static class CustomActions
    {
       public static IScriptActionBlock DoSomething() => DoSomethingBlock.Create();
    }
    
    // Usage in Build()
    public override void Build()
    {
        OnUpdate(CustomActions.DoSomething());
    }

- Pros: Cleanest usage; no indirection needed; can be used anywhere. Easy to distribute as "drop-in" .cs file. Full discovery just by adding using statement. 
- Cons: Not discoverable via this.; requires adding a using statement or fully qualified class name.

## 3. Roslyn Generator

Provided by LunyScript Engine, it would allow writing API extensions merely by implementing a common interface or tagging a class with an attribute.

Con: Roslyn generated code is a "black box" and mysterious for viewing and debugging generated code. It requires adding the 'partial' keyword to LunyScript subclasses. It's harder to set up to work across engines. 

Therefore Roslyn is not a favored solution at this point. 

## 4. Mixin via Interface 
### Native Feel, Granular Intellisense; Recommended for Sharing
   
You can use interfaces with default implementations to "inject" properties into a script class.

    public interface IInventoryApi
    {
        // Default implementation provides the property
        InventoryApi Inventory => new InventoryApi((LunyScript)this);
    }
    
    public class MyScript : LunyScript, IInventoryApi
    {
        public override void Build()
        {
            Inventory.AddItem("Sword");
        }
    }

- Pros: Feels very native; avoids inheritance depth issues. Interfaces highlight what extension the script is (likely) dependent on. Discovery is granular, based on inherited interfaces.
- Cons: Requires the user to explicitly add using statement and the interface to each of their LunyScript class definitions.

## Summary Comparison

![ExtendingLunyScriptApiSummary.png](../media/ExtendingLunyScriptApiSummary.png)

Note: Custom Hook solution omitted due to its additional bracket noise and generic use of "Custom" (or any other 'fixed') keyword the API would have to provide.

### Setup vs Discovery Friction

**Recommended**: Interface Mixins for discovery and granularity. Static extensions for least mental load in both development and use.

![ExtendingLunyScriptApiDiscovery.png](../media/ExtendingLunyScriptApiDiscovery.png)

- **Static Factory Friction**: The main friction is the "blank page" problem. A user doesn't know what they can type until they've seen it once.
- **Interface Mixin Friction**: The friction is the "boilerplate" of the class declaration. However, it serves as explicit documentation: "This script is an NPC, it has an Inventory, and it uses Combat."

### Implementation Note for ILunyScriptBlock

Regardless of the pattern chosen, ensure your custom blocks follow the project's requirements:

- Implement IScriptActionBlock or IScriptConditionBlock.
- Mark the implementation class as internal.
- Use a private constructor and a public static Create(...) method.
 
    internal sealed class MyActionBlock : IScriptActionBlock
    {
        public static MyActionBlock Create() => new();
        private MyActionBlock() {}
        public void Execute(ILunyScriptContext context) { /* implementation */ }
    }
