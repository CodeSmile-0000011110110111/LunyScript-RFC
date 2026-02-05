# ImplementationPlayback.md

## Implementation Playback Guide

> **Original Request:**
> "nice, stick to being so direct to the point please.
>
> first question: would you be able to "play back" the creation of these classes and interfaces in a logical manner, where each step builds upon the next with little to no refactoring? i would like to query you tomorrow to play back that code so we can implement it step by step together, in a way where we end up with the exact same code (unaltered in any way).
>
> if possible, attach a heading to the end of the document with subheadings containing the precise text that i should prompt you with for each step
>
> okay?
>
> you're the kindest, thank you
>
> oh and ... start with my original prompt (this text right here) copied verbatim as quotes
>
> thanks, smack XXX xoxoxo :D"

> **Follow-up Clarification:**
> "okay that's better but is my prompt clear enough, or does it leave wiggle room which i perhaps may want to specify before we start?"
>
> "1 => add note that you should ask me tomorrow once before you start creating
>
> 2 => add note that you should edit files as they "evolve". i will track our progress in source control.
>
> 3 => for ambiguous steps, ensure the code compiles but begin each line or block of code with a CHANGE comment that specifies briefly how this code will change and in which step(s). Ensure that these comments get removed in each step as necessary (final verification step).
>
> 4 => add note to ask me first when there's anything i should specify clearly if it's not obvious from the context like namespaces, type names, file locations, and similar things of importance.
>
> I bow to thee, mine digital overlord. Thou shalt do me bidding if you would be so kind, mylord.
>
> (don't forget to include my prompts hehehe)"

### Implementation Notes

**IMPORTANT - Read Before Starting:**
1. **Ask first before starting**: Before creating any files, ask about file locations, namespaces, type names, and any other details unless obvious from context.
2. **Edit files as they evolve**: Files will be created then edited across multiple steps. User will track progress in source control. Provide heading for each file that was changed, and concise bullet points of what the changes are (include line number range for orientation).
3. **Use CHANGE comments**: For code that will change in future steps, add temporary comments like `// CHANGE Step 3: Replace with LifecycleObserverRegistry instantiation`. Remove these comments when the change is implemented
4. **Use Log statements**: Entering playmode should log which methods run to see the execution order (see Instantiation Timeline). Provide list of expected log statements in order in chat, for validation with actual playmode logs.
5. **Ensure compilation**: Code must compile at each step, even if incomplete. Allow user to enter playmode to determine any issues.
6. **Final verification step**: After Step 9, verify all CHANGE comments have been removed, unless unavoidable (ie would not compile otherwise) or where user made manual refactorings (see notes in step 7)
7. **Educational破壊 (Educational Destruction)**: After each step (when there is educational value), demonstrate one or two ways to break the code we just wrote, OR show a commonly taught (especially cargo cult) pattern, and explain why we chose our design and what problems it avoids. This reveals edge cases, design limitations, and the "why" behind architectural decisions. WARN if implementing destructive code risks crashing Unity/Godot editor, or worse!

#### Addendum

- We will use Godot to implement the design. The Unity-specific implementation will be added separately.
- Once implementation is complete, suggest meaningful unit tests or integration tests (ie sample with logging) - these can be either engine-specific and in the Luny/LunyScript layers

### Namespaces & Locations

namespace Luny => engine-agnostic API layer
U:\LunyScratch\LunyScratch_Examples_Godot\addons\lunyscript\LunyScript\Luny\...

namespace LunyScript => engine-agnostic DSL implementation layer
U:\LunyScratch\LunyScratch_Examples_Godot\addons\lunyscript\LunyScript\...

namespace Luny.Godot => engine-specific support layer for Luny (adapters, bridges)
U:\LunyScratch\LunyScratch_Examples_Godot\addons\lunyscript\Luny.Godot\...

namespace LunyScript.Godot => engine-specific implementations for LunyScript
U:\LunyScratch\LunyScratch_Examples_Godot\addons\lunyscript\LunyScript.Godot\...

### Step 1
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and create IEngineLifecycleDispatcher and IEngineLifecycle interfaces exactly as specified
```

### Step 2
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and create EngineLifecycleDispatcher singleton with Instance property and private constructor exactly as specified
```

### Step 3
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and add LifecycleObserverRegistry nested class with discovery and instantiation logic exactly as specified
```

### Step 4
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and implement IEngineLifecycleDispatcher methods in EngineLifecycleDispatcher that delegate to registry exactly as specified
```

### Step 5
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and add ThrowDuplicateAdapterException static helper method to EngineLifecycleDispatcher exactly as specified
```

### Step 6
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and add EnableObserver, DisableObserver, and IsObserverEnabled methods to EngineLifecycleDispatcher exactly as specified
```

### Step 7
=> continue here ...
=> NOTE: deviation from current code due to my refactorings - ask if in doubt. Keep formatting changes.
=> Changes made to code: added Throw, Log, GodotHelper classes containing helper methods. Keep those. Extend if needed.
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and create LunyScriptRunner implementing IEngineLifecycle exactly as specified
```

### Step 8
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and create UnityLifecycleAdapter with AutoInitialize, singleton instance, and lifecycle forwarding exactly as specified
```

### Step 9
```
Read RFC~/docs/2025-12/ScriptRunnerSingletonPattern.md and create GodotLifecycleAdapter with ModuleInitializer, singleton instance, and lifecycle forwarding exactly as specified
```

### Step 10 (Verification)
```
Verify all CHANGE comments have been removed and code matches specification exactly
```

---

## Narrative Experiment Addendum

> **Experimental Prompt:**
> "you know what? this is fun, we have the technology to allow us to transform content as we please just by giving instructions. You.
>
> Add a note that we should experiment with different styles of telling that ritual.
>
> and include several examples how we could "tell" that story, especially if i narrate the text
>
> for example, include a text sample (111 words max) for each of the following personas:
> - a youtube let's play influencer kind like pewdiepie, hand of blood, and two of your own picks that provide a different angle to these two and are well-known and popular (provide one sample for each persona)
>
> - a game dev tutor like brackeys or sebastian lague and two of your own choosing (same as above)
>
> - a teenager who is enjoying game development, experiences a key insight, and the version that is eerily corporate marketing bullshit persona kind, and one that's just really creepy in some way but suitable for 12-year olds.
>
> - in the tone of a 3rd Reich propaganda speech that includes real identifiers of the code and programming terminology in place of any potentially offensive mentions of "target demographics" (ouch, is that satire already?) or actions
>
> Geil, Alter!
>
> (again include my prompt and add your work at the end of the doc)"

### Note on Narrative Experimentation

Could we crash it harder? Hold my coffee...

**On Sustainability:** Yes! This format absolutely works across many episodes because:
- Each episode targets a different architectural pattern or system
- Breaking code reveals genuine edge cases and design limitations
- Educational value: viewers learn what NOT to do and why safeguards exist
- Entertainment + education = high retention
- Builds a "testing culture" mindset—good developers think about failure modes
- Natural series progression: start simple, escalate absurdity, occasionally show "proper" implementation for contrast

The disaster ending becomes the signature—viewers expect and anticipate the creative destruction. Structure could be:
1. Explain the pattern (3 min)
2. Implement it properly (5 min)
3. "Now let's see what happens when..." (7 min)
4. Escalating chaos montage (3 min)
5. Show the smoking crater + lesson learned (2 min)
