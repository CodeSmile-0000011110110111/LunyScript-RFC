# About the Author

## Table of Contents

- [My CV, informally](#my-cv-informally)
- [The Realization](#the-realization)
- [The "Why?" Behind LunyScript - A Personal Story](#the-why-behind-lunyscript---a-personal-story)
- [The 'Luny' Vision](VISION.md)

---

## My CV, informally
Hi! I'm Steffen from Germany.

[![Reacting to 50 GitHub stars](../media/I%20react%20to%2050%20stars%21%20Short.gif)](https://www.youtube.com/watch?v=wx7469U2pTM){:target="_blank"}
<sub>Me, reacting to LunyScript's 50th GitHub star live on stream ... :)</sub>

I've been modding and making games since the 1990s. I particularly enjoyed modding with scripting languages (Hexen, Quake). My first paycheck: beta-testing for 3D Realms. Work-Life perfectly balanced: "I'm not playing, mum. I'm working!" :)

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/shadow-warrior.jpg" width="300">
</div>

Around 2000 I worked as designer on eight GameBoy titles in three years. We used visual statemachines to script entire games. It was super productive and fun.

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/Die-Maus-Verrueckte-Olympiade.png" width="300">
</div>

Then I transferred the statemachines concept to a Lua-based declarative API: command units, script dialogue and cutscenes. Designers loved the power, onboarding was easy. We created three heavily scripted titles with three add-ons (SpellForce, BattleForge).

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/spellforce2.jpg" width="300">
</div>

Then I began freelancing for mobile as it exploded. I had fun writing game engine books (Learn cocos2d, Learn SpriteBuilder).

<div style="display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click images to view full size ⤢</em>
</div>
<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<img src="media/history/learn-cocos2d.jpg" width="150">
</div>
<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<img src="media/history/learn-spritebuilder.jpg" width="150">
</div>
</div>

2015 onwards I stepped into 'digital marketing'. As train buff, I just couldn't resist creating a realtime 3D Train Configurator in Unity for Siemens. It had a Virtual Reality mode with hand gesture interaction.

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/SiemensInspiroConfigurator.png" width="300">
</div>

What followed was an extreme mixture of serial low-budget projects and innovative high-tech experiences for IBM, ZF, Voith, SEW Eurodrive, National Geographic. Almost exclusively with Unity.

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/Nat-Geo-Encounter-NY.jpg" width="300">
</div>

Since 2022 I've done excessive R&D, prototyping, frameworking. Searching for 'the one' - the project combining self-efficacy with self-sufficiency. It led to interesting discoveries...

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/MultiPal.png" width="300">
</div>

Finally, I just went ahead and spent months integrating Lua in Unity as alternative language. With Unity's full API exposed.

<div class="clickable-image" style="cursor: pointer; display: inline-block;">
<div style="text-align: center; font-size: 12px; color: #666; margin-bottom: 5px;">
  <em>Click image to view full size ⤢</em>
</div>
<img src="media/history/LunyLogo.png" width="300">
</div>

But .. this meant it was no different from removed UnityScript and UnrealScript: a simpler language alright, but with the engine's full API complexity!

Researching into the history and future of game engines, I came across many beginner tutorials, calls for help, and code snippets - same content, different engines.

Then it struck me.

---

## The Realization

We teach young game engine "drivers" Volkswagen here, Chrysler there. We caution: "Don't learn driving with a Porsche!"

**This makes no sense!** 

Between Scratch and Godot/Unity, there's a lot of learners going back and forth, struggling to make sense of the complexity of game engines.

We call this **🔥Tutorial Hell🥵**.

---

## The "Why?" Behind LunyScript - A Personal Story

**High-level, text-based programming is efficient and designer-friendly.** It eases beginners into complex programming tasks and introduces them to valuable patterns, as I've learned myself.

Unfortunately, it's also a lost art.

Well into the 2000s many game studios had the highly valuable role of the **designing-coder** and the **coding-designer**. Both were using the same tool, a scripting language, or parsed data descriptions, or both. It was simple and intuitive, but also very powerful.

Because without code, a design is worthless. And without design, code is ineffective.

![spellforce2-dragonstorm.jpg](media/history/spellforce2-dragonstorm.jpg)
<sup>SpellForce 2 - Dragon Storm (2007)</sup>

The race towards "higher efficiency" forced the team I worked with to split up into separate entities with specialized roles: the ones who created the flow of gameplay, and the ones who made the environment look consistently good.

From then on, **at the very core of gameplay was a disconnect.**

Two factions viewing each other as foreigners. The artists break the logic. The designers messed up the art. We changed creation from an amalgamation of personal creative choices towards building a soulless product on an assembly line.

![battleforge.jpg](media/history/battleforge.jpg)
<sup>BattleForge (2009)</sup>

This is the state of the game **industry** at large today.

Only small teams and individuals can afford to break out of the role and genre specializations dictated by big game production's labor-intensive work. In fact, creativity is their most important angle to find success.

But those artists, solopreneurs, visionaries, and beginners all struggle to cope with the immense complexity of powerful tools we have at our disposal - just to create very basic gameplay features.

I **know** that the amalgamation of "design as code" works and provides huge benefits. Even absolute non-programmers were able to implement designs within days.

That's all **I** need to know. Of course **you** want to know more ..

[→ The Vision](VISION.md)
