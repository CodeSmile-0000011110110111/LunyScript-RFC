# ExtendingLunyScriptApi.md

To enable users to write their own APIs that feel "native" within the LunyScript fluent environment, there are several architectural patterns available. 

Here are the recommended options:

### 1. Game-Specific Base Class (Most native feel; Recommended for Students/Teams)

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

### 2. Static Factory Classes (Cleanest Syntax, Least Discoverable; Recommended for Sharing)

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

### 3. Mixin via Interface (Native Feel, Plug-In & Use; Recommended for Sharing)
   
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
