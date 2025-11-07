/*
 *
 * PROOF OF CONCEPT SCRIPT - NOT REPRESENTATIVE OF FINAL API !!
 *
 * This showcases the code I worked with in three engines (Godot, Unity, Unreal) to
 * create the October 2025 proof of concept: same code, same outcome, three engines.
 *
 * This script still leaks engine-specific artifacts, eg usings, base class, exported fields.
 * As such it clearly marks this script as a Godot script. Final LunyScripts will be agnostic!
 * Direct-to-Native escape hatch will continue to be supported of course.
 *
 * References to "Scratch" will be removed. While LunyScript is beginner-friendly, it's far more than Scratch!
 *
 */

using Godot;
using LunyScratch;
using System;
using static LunyScratch.Blocks;

namespace LunyScratch_Examples.scratches
{
	public sealed partial class CompanionCubeScratch : ScratchRigidbody3D
	{
		[Export] private Single _minVelocityForSound = 5f;

		protected override void OnScratchReady()
		{
			var progressVar = GlobalVariables["Progress"];
			var counterVar = Variables["Counter"];

			// increment counter to be able to hit the ball again
			RepeatForever(AddVariable(counterVar, 5), Wait(1));

			Run(Disable("Lights"));

			When(CollisionEnter(tag: "Police"),
				// play bump sound unconditionally and make cube glow
				PlaySound(), Enable("Lights"),
				// count down from current progress value to spawn more cube instances the longer the game progresses
				RepeatWhileTrue(() =>
					{
						if (counterVar.Number > progressVar.Number)
							counterVar.Set(Math.Clamp(progressVar.Number, 1, 50));
						counterVar.Subtract(1);
						return counterVar.Number >= 0;
					}, CreateInstance("scenes/hiteffect"), Wait(1 / 60f),
					CreateInstance("scenes/hiteffect"), Wait(1 / 60f),
					CreateInstance("scenes/hiteffect")),
				Wait(1), Disable("Lights"));

			// play sound when ball bumps into anything
			When(CollisionEnter(),
				If(IsCurrentSpeedGreater(_minVelocityForSound),
					PlaySound()));
		}
	}
}
