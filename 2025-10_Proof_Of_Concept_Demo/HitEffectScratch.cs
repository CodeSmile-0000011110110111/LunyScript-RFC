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
 * References to "Scratch" will be removed. While LunyScript is beginner-friendly,
 * it would incorrectly imply that it's a toy for children.
 *
 */

using Godot;
using LunyScratch;
using System;
using static LunyScratch.Blocks;

namespace LunyScratch_Examples.scratches
{
	public sealed partial class HitEffectScratch : ScratchRigidbody3D
	{
		[Export] private Double _timeToLiveInSeconds = 3;
		[Export] private Double _minVelocityForSound = 3;

		protected override void OnScratchReady()
		{
			Run(Wait(_timeToLiveInSeconds), DestroySelf());

			var globalTimeout = GlobalVariables["MiniCubeSoundTimeout"];
			When(CollisionEnter(),
				If(AND(IsVariableLessThan(globalTimeout, 0), IsCurrentSpeedGreater(_minVelocityForSound)),
					PlaySound(), SetVariable(globalTimeout, 0)));
		}
	}
}
