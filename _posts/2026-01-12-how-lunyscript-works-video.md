---
layout: post
title: "How LunyScript Works (Video)"
date: 2026-01-12
categories: [design]
tags: [development, architecture, grants, funding]
featured_image: ../media/How%20LunyScript%20works.png
---

# Good news - I hope! :)

On January 6th I received an automated email from the [PrototypeFund](https://www.prototypefund.de/en):

> Your application is now in "External Review" status

This seems to indicate that LunyScript passed at least the prefilter where they sort out any 'unfit' projects. They initially received 458 applications - a record high! 

This prompted me to record an Architecture Overview video over the weekend: 

<sub>How Cross-Engine Scripting Works - LunyScript Architecture</sub>
<iframe width="648" height="365" src="https://www.youtube.com/embed/0Wlz7obQwOY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Here's the complete architecture diagram:
![LunyScript-Architecture-Complete.png](/media/LunyScript-Architecture-Complete.png)

**⭐[Every GitHub star welcome!](https://github.com/CodeSmile-0000011110110111/LunyScript-RFC/)⭐** -- Unfortunately reaching the #100 milestone (currently: 79) within four days (Jan 15th) seems unlikely. There was little activity over the holidays but since last week it's been 2-4 stars per day once more. Keep those ⭐s coming and spread the word! 😊

## Sidelining Engine-Object Lifecycle Events

Luckily I've been doing some early implementation work over the holidays so I also have plenty of code to show. 

And confidence that I made the right call to entirely sideline engine-native lifecycle events that the engine-native objects normally receive in their scripts. This provides determinism without having to bend over backwards just to get minute details right. 

## Demoting Engine-Native Code 

I also spent some extra efforts to ensure that as much logic code as possible is moved to Luny's engine-agnostic layer, demoting engine-native code to plain and simple API mappings and tiny utilities. For example, this is the entire Unity GameObject native wrapper:

	internal sealed class UnityGameObject : LunyObject
	{
		private Renderer _renderer;
		private Renderer Renderer => _renderer != null ? _renderer : GO.TryGetComponent(out _renderer) ? _renderer : null;
		private GameObject GO => Cast<GameObject>();
		private static Boolean IsNativeObjectVisible(GameObject gameObject) =>
			gameObject.TryGetComponent<Renderer>(out var renderer) && renderer.enabled;
		public UnityGameObject(GameObject gameObject)
			: base(gameObject, gameObject.GetEntityId(), gameObject.activeSelf, IsNativeObjectVisible(gameObject)) {}
		protected override void DestroyNativeObject() => Object.Destroy(GO);
		protected override Boolean IsNativeObjectValid() => GO != null;
		protected override String GetNativeObjectName() => GO.name;
		protected override void SetNativeObjectName(String name) => GO.name = name;
		protected override Boolean GetNativeObjectEnabledInHierarchy() => GO.activeInHierarchy;
		protected override Boolean GetNativeObjectEnabled() => GO.activeSelf;
		protected override void SetNativeObjectEnabled() => GO.SetActive(true);
		protected override void SetNativeObjectDisabled() => GO.SetActive(false);
		protected override void SetNativeObjectVisible() { if (Renderer != null) Renderer.enabled = true; }
		protected override void SetNativeObjectInvisible() { if (Renderer != null) Renderer.enabled = false; }
	}

Godot's version is only slightly more complicated due to type checks and more elaborate "processing mode" settings.
