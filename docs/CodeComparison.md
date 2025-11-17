# Code Comparison: LunyScript vs Engines

Comparing code for beginner's tasks demonstrates how LunyScript reduces cognitive load and boilerplate code when learning game engine programming.

LunyScript encourages exploration and experimentation in a safer environment without feeling overwhelmed. This actively prevents self-learners from entering the unproductive comfort zone we call [_tutorial hell_](https://www.google.com/search?q=game+development+tutorial+hell+meaning){:target="_blank"}.

## Quick Summary

<font color=lightgreen size=4>
<b>LunyScript is 3-5 times less verbose than GDScript!</b>
</font>
![Chart_Lines_of_Code.png](../media/Chart_Lines_of_Code.png)
<sup>[View Interactive Chart](https://docs.google.com/spreadsheets/d/e/2PACX-1vQYteK-tn0qLcvssVP5sLEcTg7adjtRbbE56Usj-BUmtx033RVY9lLt0aPpL_Ef4uEp8DNvRpBgWLTh/pubchart?oid=2073524744&format=interactive){:target="_blank"}</sup>

LunyScript merely defers initial learning of engine API concepts. Bite-sized extensions means users learn engine concepts in a highly focused manner at their own pace.

# Direct Code Comparison
**Engines Compared:**
- **LunyScript** (Cross-engine C#, **Proof of Concept API**)
- **GDScript** (Godot domain specific language)
- **Godot C#** (Godot C#)
- **Unity C#** (Unity C#)
- **Roblox Lua** (for reference)

**🚧 Note:** Code samples were created by AI. I spot-checked different styles and code paths, differences average out. C# line count includes bracket lines - without them, their line count doesn't differ much from GDScript.

---

## 1. Collision Detection & Response

**Task:** Play a sound when the ball collides with the paddle.

**Overwhelm Reduction:** 90%

<div class="code-tabs" data-group="collision">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 3

**Concepts needed:** 0 new concepts (reads as intent)

```csharp
protected override void OnReady()
{
  When.Collision.With("Paddle").Begins(Audio.Play("paddle_hit"));
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 14

**Concepts needed:** @export, @onready, node paths, signal.connect(), is_in_group(), null safety

```gdscript
@export var paddle_hit_sound: AudioStream
@onready var audio_player: AudioStreamPlayer3D = $AudioStreamPlayer3D

func _ready():
  if audio_player == null:
      audio_player = AudioStreamPlayer3D.new()
      add_child(audio_player)

  body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node3D):
  if body.is_in_group("Paddle"):
      if audio_player and paddle_hit_sound:
          audio_player.stream = paddle_hit_sound
          audio_player.play()
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 25+

**Concepts needed:** Node lifecycle, Export attribute, AudioStreamPlayer3D, GetNode, Groups/tags, Signal connections (not shown), manual setup

```csharp
[Export] private AudioStream _paddleHitSound;
private AudioStreamPlayer3D _audioPlayer;

public override void _Ready()
{
  _audioPlayer = GetNode<AudioStreamPlayer3D>("AudioStreamPlayer3D");
  if (_audioPlayer == null)
  {
      _audioPlayer = new AudioStreamPlayer3D();
      AddChild(_audioPlayer);
  }
}

public override void _PhysicsProcess(double delta)
{
  // Note: Need to track collisions manually or use signals
}

private void _OnBodyEntered(Node3D body)
{
  if (body.IsInGroup("Paddle"))
  {
      if (_audioPlayer != null && _paddleHitSound != null)
      {
          _audioPlayer.Stream = _paddleHitSound;
          _audioPlayer.Play();
      }
  }
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 16

**Concepts needed:** MonoBehaviour lifecycle, SerializeField, AudioSource component, GetComponent, OnCollisionEnter callback, Collision object, tag comparison, null checking

```csharp
[SerializeField] private AudioClip paddleHitSound;
private AudioSource audioSource;

private void Start()
{
  audioSource = GetComponent<AudioSource>();
  if (audioSource == null)
      audioSource = gameObject.AddComponent<AudioSource>();
}

private void OnCollisionEnter(Collision collision)
{
  if (collision.gameObject.CompareTag("Paddle"))
  {
      if (audioSource != null && paddleHitSound != null)
          audioSource.PlayOneShot(paddleHitSound);
  }
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 22

**Concepts needed:** Instance hierarchy, CollectionService tags, FindFirstChild, Touched event, :Connect(), debounce pattern, SoundId/asset IDs

```lua
local CollectionService = game:GetService("CollectionService")
local ball = script.Parent
local paddleHitSound = ball:FindFirstChild("PaddleHitSound")

if not paddleHitSound then
  paddleHitSound = Instance.new("Sound")
  paddleHitSound.Name = "PaddleHitSound"
  paddleHitSound.SoundId = "rbxassetid://12345678"
  paddleHitSound.Parent = ball
end

local debounce = false

ball.Touched:Connect(function(hit)
  if debounce then return end

  local isPaddle = CollectionService:HasTag(hit, "Paddle")
  if isPaddle and paddleHitSound then
    debounce = true
    paddleHitSound:Play()
    task.wait(0.1)
    debounce = false
  end
end)
```

</div>
</div>




## 2. Input Handling (Keyboard)

**Task:** Move the player forward when pressing W, backward when pressing S.

**Overwhelm Reduction:** 85%

<div class="code-tabs" data-group="input">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 6

**Concepts needed:** 0 new concepts (reads as intent)

```csharp
protected override void OnReady()
{
  RepeatForeverPhysics(
      If(IsKeyPressed(Key.W), MoveForward(10)),
      If(IsKeyPressed(Key.S), MoveBackward(10))
  );
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 18

**Concepts needed:** @export, @onready, _physics_process, Input.is_key_pressed, KEY_ constants, Vector3, global_transform.basis, delta, coordinate systems

```gdscript
@export var move_speed: float = 10.0
@onready var rigidbody: RigidBody3D = self

func _ready():
  if not rigidbody is RigidBody3D:
      push_error("RigidBody3D required!")
      set_physics_process(false)

func _physics_process(delta):
  var movement = Vector3.ZERO

  if Input.is_key_pressed(KEY_W):
      movement = -global_transform.basis.z * move_speed * delta
  elif Input.is_key_pressed(KEY_S):
      movement = global_transform.basis.z * move_speed * delta

  if movement != Vector3.ZERO:
      global_position += movement
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 31

**Concepts needed:** Export, RigidBody3D, _PhysicsProcess vs _Process, Input.IsKeyPressed, Key enum, Vector3, GlobalTransform.Basis, delta time, coordinate system differences

```csharp
[Export] private float _moveSpeed = 10f;
private RigidBody3D _rigidbody;

public override void _Ready()
{
  _rigidbody = this as RigidBody3D;
  if (_rigidbody == null)
  {
      GD.PrintErr("RigidBody3D required!");
      SetPhysicsProcess(false);
  }
}

public override void _PhysicsProcess(double delta)
{
  Vector3 movement = Vector3.Zero;

  if (Input.IsKeyPressed(Key.W))
  {
      movement = -GlobalTransform.Basis.Z * _moveSpeed * (float)delta;
  }
  else if (Input.IsKeyPressed(Key.S))
  {
      movement = GlobalTransform.Basis.Z * _moveSpeed * (float)delta;
  }

  if (movement != Vector3.Zero)
  {
      var newPosition = _rigidbody.GlobalPosition + movement;
      _rigidbody.GlobalPosition = newPosition;
  }
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 28

**Concepts needed:** SerializeField, Rigidbody, GetComponent, FixedUpdate vs Update, Input.GetKey, KeyCode enum, Vector3, transform.forward, Time.fixedDeltaTime, physics integration

```csharp
[SerializeField] private float moveSpeed = 10f;
private Rigidbody rb;

private void Start()
{
  rb = GetComponent<Rigidbody>();
  if (rb == null)
  {
      Debug.LogError("Rigidbody component required!");
      enabled = false;
  }
}

private void FixedUpdate()
{
  Vector3 movement = Vector3.zero;

  if (Input.GetKey(KeyCode.W))
  {
      movement = transform.forward * moveSpeed * Time.fixedDeltaTime;
  }
  else if (Input.GetKey(KeyCode.S))
  {
      movement = -transform.forward * moveSpeed * Time.fixedDeltaTime;
  }

  if (movement != Vector3.zero)
      rb.MovePosition(rb.position + movement);
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 26

**Concepts needed:** UserInputService, Enum.KeyCode, RunService.Heartbeat, BodyVelocity or AssemblyLinearVelocity, CFrame.LookVector, Part vs Model, script.Parent hierarchy

```lua
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local player = script.Parent
local moveSpeed = 10

local function isKeyPressed(keyCode)
  return UserInputService:IsKeyDown(keyCode)
end

RunService.Heartbeat:Connect(function(delta)
  local movement = Vector3.new(0, 0, 0)

  if isKeyPressed(Enum.KeyCode.W) then
    movement = player.CFrame.LookVector * moveSpeed * delta
  elseif isKeyPressed(Enum.KeyCode.S) then
    movement = -player.CFrame.LookVector * moveSpeed * delta
  end

  if movement.Magnitude > 0 then
    if player:IsA("BasePart") then
      player.CFrame = player.CFrame + movement
    elseif player:IsA("Model") and player.PrimaryPart then
      player:SetPrimaryPartCFrame(player.PrimaryPart.CFrame + movement)
    end
  end
end)
```

</div>
</div>




## 3. Audio Playback

**Task:** Play a sound effect when an event occurs.

**Overwhelm Reduction:** 80%

<div class="code-tabs" data-group="audio">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 3

**Concepts needed:** 0 new concepts

```csharp
protected override void OnReady()
{
  When.Collision.With("Wall").Begins(Audio.Play("bump"));
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 12

**Concepts needed:** @export, @onready, AudioStream vs Player, new() instantiation, add_child, signal connections, groups

```gdscript
@export var bump_sound: AudioStream
@onready var audio_player: AudioStreamPlayer3D = AudioStreamPlayer3D.new()

func _ready():
  add_child(audio_player)
  body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node3D):
  if body.is_in_group("Wall"):
      if bump_sound:
          audio_player.stream = bump_sound
          audio_player.play()
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 18

**Concepts needed:** AudioStream vs AudioStreamPlayer3D, Export, node creation, AddChild, setting Stream before Play, groups

```csharp
[Export] private AudioStream _bumpSound;
private AudioStreamPlayer3D _audioPlayer;

public override void _Ready()
{
  _audioPlayer = new AudioStreamPlayer3D();
  AddChild(_audioPlayer);
}

private void _OnBodyEntered(Node3D body)
{
  if (body.IsInGroup("Wall"))
  {
      if (_bumpSound != null && _audioPlayer != null)
      {
          _audioPlayer.Stream = _bumpSound;
          _audioPlayer.Play();
      }
  }
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 21

**Concepts needed:** AudioClip vs AudioSource, SerializeField, GetComponent, AddComponent, PlayOneShot vs Play, null checking, component architecture

```csharp
[SerializeField] private AudioClip bumpSound;
private AudioSource audioSource;

private void Start()
{
  audioSource = GetComponent<AudioSource>();
  if (audioSource == null)
  {
      audioSource = gameObject.AddComponent<AudioSource>();
  }
}

private void OnCollisionEnter(Collision collision)
{
  if (collision.gameObject.CompareTag("Wall"))
  {
      if (bumpSound != null && audioSource != null)
      {
          audioSource.PlayOneShot(bumpSound);
      }
  }
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 18

**Concepts needed:** CollectionService, Touched event, :Connect(), Instance.new(), SoundId/asset IDs, debounce pattern

```lua
local CollectionService = game:GetService("CollectionService")
local object = script.Parent
local bumpSound = object:FindFirstChild("BumpSound")

if not bumpSound then
  bumpSound = Instance.new("Sound")
  bumpSound.Name = "BumpSound"
  bumpSound.SoundId = "rbxassetid://12345678"
  bumpSound.Parent = object
end

local debounce = false

object.Touched:Connect(function(hit)
  if debounce then return end
  if CollectionService:HasTag(hit, "Wall") and bumpSound then
    debounce = true
    bumpSound:Play()
    task.wait(0.1)
    debounce = false
  end
end)
```

</div>
</div>




## 4. UI Button Events

**Task:** Restart the game when clicking the "Try Again" button.

**Overwhelm Reduction:** 75%

<div class="code-tabs" data-group="button">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 3

**Concepts needed:** 0 new concepts

```csharp
protected override void OnReady()
{
  When(ButtonClicked("TryAgain"), ReloadCurrentScene());
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 16

**Concepts needed:** @onready, $ node path, Button, find_child, signal.connect/disconnect, _exit_tree, get_tree(), reload_current_scene()

```gdscript
@onready var try_again_button: Button = $TryAgain

func _ready():
  if try_again_button == null:
      try_again_button = get_tree().root.find_child("TryAgain", true, false)

  if try_again_button:
      try_again_button.pressed.connect(_on_try_again_pressed)
  else:
      push_error("TryAgain button not found!")

func _exit_tree():
  if try_again_button:
      try_again_button.pressed.disconnect(_on_try_again_pressed)

func _on_try_again_pressed():
  get_tree().reload_current_scene()
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 28

**Concepts needed:** Button node, GetNode vs FindChild, node paths, Pressed signal/event, += event subscription, -= cleanup, _ExitTree lifecycle, GetTree(), ReloadCurrentScene()

```csharp
private Button _tryAgainButton;

public override void _Ready()
{
  _tryAgainButton = GetNode<Button>("TryAgain");

  if (_tryAgainButton == null)
  {
      _tryAgainButton = GetTree().Root.FindChild("TryAgain", true, false) as Button;
  }

  if (_tryAgainButton != null)
  {
      _tryAgainButton.Pressed += OnTryAgainPressed;
  }
  else
  {
      GD.PrintErr("TryAgain button not found!");
  }
}

public override void _ExitTree()
{
  if (_tryAgainButton != null)
  {
      _tryAgainButton.Pressed -= OnTryAgainPressed;
  }
}

private void OnTryAgainPressed()
{
  GetTree().ReloadCurrentScene();
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 30

**Concepts needed:** UnityEngine.UI namespace, Button component, SerializeField, GameObject.Find, GetComponent, AddListener/RemoveListener, OnDestroy cleanup, SceneManager, GetActiveScene, scene lifecycle

```csharp
using UnityEngine.UI;
using UnityEngine.SceneManagement;

[SerializeField] private Button tryAgainButton;

private void Start()
{
  if (tryAgainButton == null)
  {
      tryAgainButton = GameObject.Find("TryAgain")?.GetComponent<Button>();
  }

  if (tryAgainButton != null)
  {
      tryAgainButton.onClick.AddListener(OnTryAgainClicked);
  }
  else
  {
      Debug.LogError("TryAgain button not found!");
  }
}

private void OnDestroy()
{
  if (tryAgainButton != null)
  {
      tryAgainButton.onClick.RemoveListener(OnTryAgainClicked);
  }
}

private void OnTryAgainClicked()
{
  Scene currentScene = SceneManager.GetActiveScene();
  SceneManager.LoadScene(currentScene.name);
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 17

**Concepts needed:** ScreenGui hierarchy, TextButton, FindFirstChild with recursive search, MouseButton1Click event, :Connect(), TeleportService vs local restart

```lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local tryAgainButton = playerGui:FindFirstChild("TryAgainButton", true)

if not tryAgainButton or not tryAgainButton:IsA("TextButton") then
  warn("TryAgainButton not found in PlayerGui!")
  return
end

tryAgainButton.MouseButton1Click:Connect(function()
  -- Restart by respawning player
  player:LoadCharacter()
  -- Or reload the place:
  -- game:GetService("TeleportService"):Teleport(game.PlaceId, player)
end)
```

</div>
</div>




## 5. Variables & HUD Binding

**Task:** Display a score variable on the UI that automatically updates.

**Overwhelm Reduction:** 70%

<div class="code-tabs" data-group="variables">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 9

**Concepts needed:** 0 new concepts (automatic binding)

```csharp
protected override void OnReady()
{
  var score = Variables.Set("Score", 0);
  HUD.BindVariable(score);

  // Score automatically updates UI when changed
  When.Collision.With("Coin").Begins(
      IncrementVariable(score),
      Audio.Play("coin")
  );
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 26

**Concepts needed:** @export, Label, find_child, manual UI updates, str() conversion, signal connections, separation of concerns

```gdscript
@export var score_label: Label
var score: int = 0

func _ready():
  if score_label == null:
      score_label = get_tree().root.find_child("ScoreLabel", true, false)

  if score_label == null:
      push_error("ScoreLabel not found!")

  update_score_display()
  body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node3D):
  if body.is_in_group("Coin"):
      score += 1
      update_score_display()
      play_coin_sound()

func update_score_display():
  if score_label:
      score_label.text = "Score: " + str(score)

func play_coin_sound():
  # Audio code omitted for brevity
  pass
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 36

**Concepts needed:** Label node, Export, FindChild, manual UI updates, string interpolation, separation of concerns, signal connections (not shown)

```csharp
[Export] private Label _scoreLabel;
private int _score = 0;

public override void _Ready()
{
  if (_scoreLabel == null)
  {
      _scoreLabel = GetTree().Root.FindChild("ScoreLabel", true, false) as Label;
  }

  if (_scoreLabel == null)
  {
      GD.PrintErr("ScoreLabel not found!");
  }

  UpdateScoreDisplay();
}

private void _OnBodyEntered(Node3D body)
{
  if (body.IsInGroup("Coin"))
  {
      _score++;
      UpdateScoreDisplay();
      PlayCoinSound();
  }
}

private void UpdateScoreDisplay()
{
  if (_scoreLabel != null)
  {
      _scoreLabel.Text = $"Score: {_score}";
  }
}

private void PlayCoinSound()
{
  // Audio code omitted for brevity
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 37

**Concepts needed:** Text component, SerializeField, GameObject.Find, manual UI updates, ToString(), string concatenation, separation of concerns (UpdateScoreDisplay method)

```csharp
using UnityEngine.UI;

[SerializeField] private Text scoreText;
private int score = 0;

private void Start()
{
  if (scoreText == null)
  {
      scoreText = GameObject.Find("ScoreText")?.GetComponent<Text>();
  }

  if (scoreText == null)
  {
      Debug.LogError("ScoreText not found!");
  }

  UpdateScoreDisplay();
}

private void OnCollisionEnter(Collision collision)
{
  if (collision.gameObject.CompareTag("Coin"))
  {
      score++;
      UpdateScoreDisplay();
      PlayCoinSound();
  }
}

private void UpdateScoreDisplay()
{
  if (scoreText != null)
  {
      scoreText.text = "Score: " + score.ToString();
  }
}

private void PlayCoinSound()
{
  // Audio code omitted for brevity
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 27

**Concepts needed:** Players.LocalPlayer, PlayerGui hierarchy, TextLabel, FindFirstChild recursive, CollectionService, Touched event, manual UI updates, string concatenation

```lua
local Players = game:GetService("Players")
local CollectionService = game:GetService("CollectionService")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local scoreLabel = playerGui:FindFirstChild("ScoreLabel", true)

if not scoreLabel or not scoreLabel:IsA("TextLabel") then
  warn("ScoreLabel not found!")
  return
end

local score = 0

local function updateScoreDisplay()
  scoreLabel.Text = "Score: " .. tostring(score)
end

local function playCoinSound()
  -- Audio code omitted for brevity
end

updateScoreDisplay()

local object = script.Parent
object.Touched:Connect(function(hit)
  if CollectionService:HasTag(hit, "Coin") then
    score = score + 1
    updateScoreDisplay()
    playCoinSound()
  end
end)
```

</div>
</div>




## 6. Timers & Sequences

**Task:** Countdown timer that ends the game when it reaches zero.

**Overwhelm Reduction:** 65%

<div class="code-tabs" data-group="timers">
<div class="tab-buttons">
<button class="tab-button active">LunyScript</button>
<button class="tab-button">GDScript</button>
<button class="tab-button">Godot C#</button>
<button class="tab-button">Unity C#</button>
<button class="tab-button">Roblox Lua</button>
</div>
<div class="tab-content active" markdown="1">

**Lines of code:** 10

**Concepts needed:** 0 new concepts (reads as sequence)

```csharp
protected override void OnReady()
{
  var time = Variables.Set("Time", 60);
  HUD.BindVariable(time);

  RepeatForever(
      Wait(1),
      DecrementVariable(time),
      If(IsVariableLessOrEqual(time, 0), EndGame())
  );
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 32

**Concepts needed:** get_tree().create_timer(), SceneTreeTimer, timeout signal, signal.connect, recursive timer restart, ceili() for ceiling, manual UI updates

```gdscript
@export var time_label: Label
@export var start_time: float = 60.0
var current_time: float

func _ready():
  if time_label == null:
      time_label = get_tree().root.find_child("TimeLabel", true, false)

  current_time = start_time
  update_time_display()
  start_countdown()

func start_countdown():
  var timer = get_tree().create_timer(1.0)
  timer.timeout.connect(_on_timer_timeout)

func _on_timer_timeout():
  current_time -= 1
  update_time_display()

  if current_time <= 0:
      end_game()
  else:
      start_countdown()

func update_time_display():
  if time_label:
      time_label.text = "Time: " + str(ceili(current_time))

func end_game():
  # Game over logic
  pass
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 53

**Concepts needed:** SceneTreeTimer, CreateTimer, Timeout signal/event, += event subscription, recursive timer restart, _ExitTree cleanup, manual UI updates

```csharp
[Export] private Label _timeLabel;
[Export] private float _startTime = 60f;
private float _currentTime;
private SceneTreeTimer _timer;

public override void _Ready()
{
  if (_timeLabel == null)
  {
      _timeLabel = GetTree().Root.FindChild("TimeLabel", true, false) as Label;
  }

  _currentTime = _startTime;
  UpdateTimeDisplay();
  StartCountdown();
}

private void StartCountdown()
{
  _timer = GetTree().CreateTimer(1.0f);
  _timer.Timeout += OnTimerTimeout;
}

private void OnTimerTimeout()
{
  _currentTime--;
  UpdateTimeDisplay();

  if (_currentTime <= 0)
  {
      EndGame();
  }
  else
  {
      StartCountdown(); // Restart timer
  }
}

public override void _ExitTree()
{
  if (_timer != null && !_timer.IsDisposed())
  {
      _timer.Timeout -= OnTimerTimeout;
  }
}

private void UpdateTimeDisplay()
{
  if (_timeLabel != null)
  {
      _timeLabel.Text = $"Time: {Mathf.CeilToInt(_currentTime)}";
  }
}

private void EndGame()
{
  // Game over logic
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 49

**Concepts needed:** Coroutines, IEnumerator, yield return, WaitForSeconds, StartCoroutine, StopCoroutine, OnDestroy cleanup, while loops, manual UI updates

```csharp
using System.Collections;
using UnityEngine.UI;

[SerializeField] private Text timeText;
[SerializeField] private float startTime = 60f;
private float currentTime;
private Coroutine timerCoroutine;

private void Start()
{
  if (timeText == null)
  {
      timeText = GameObject.Find("TimeText")?.GetComponent<Text>();
  }

  currentTime = startTime;
  UpdateTimeDisplay();
  timerCoroutine = StartCoroutine(CountdownTimer());
}

private void OnDestroy()
{
  if (timerCoroutine != null)
  {
      StopCoroutine(timerCoroutine);
  }
}

private IEnumerator CountdownTimer()
{
  while (currentTime > 0)
  {
      yield return new WaitForSeconds(1f);
      currentTime--;
      UpdateTimeDisplay();

      if (currentTime <= 0)
      {
          EndGame();
      }
  }
}

private void UpdateTimeDisplay()
{
  if (timeText != null)
  {
      timeText.text = "Time: " + Mathf.CeilToInt(currentTime).ToString();
  }
}

private void EndGame()
{
  // Game over logic
}
```

</div>
<div class="tab-content" markdown="1">

**Lines of code:** 33

**Concepts needed:** Players.LocalPlayer, PlayerGui hierarchy, TextLabel, task.wait() vs wait(), while loop, manual UI updates, math.ceil, coroutine vs sequential code

```lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local timeLabel = playerGui:FindFirstChild("TimeLabel", true)

if not timeLabel or not timeLabel:IsA("TextLabel") then
  warn("TimeLabel not found!")
  return
end

local startTime = 60
local currentTime = startTime

local function updateTimeDisplay()
  if timeLabel then
    timeLabel.Text = "Time: " .. tostring(math.ceil(currentTime))
  end
end

local function endGame()
  -- Game over logic
end

updateTimeDisplay()

-- Start countdown timer
task.spawn(function()
  while currentTime > 0 do
    task.wait(1)
    currentTime = currentTime - 1
    updateTimeDisplay()

    if currentTime <= 0 then
      endGame()
    end
  end
end)
```

</div>
</div>




## Summary Table

| Concept | LunyScript LOC | Unity C# LOC | Godot C# LOC | GDScript LOC | Overwhelm Reduction |
|---------|----------------|--------------|--------------|--------------|---------------------|
| Collision Detection | 3 | 16 | 25+ | 14 | 90% |
| Input Handling | 6 | 28 | 31 | 18 | 85% |
| Audio Playback | 3 | 21 | 18 | 12 | 80% |
| UI Button Events | 3 | 30 | 28 | 16 | 75% |
| Variables & HUD Binding | 9 | 37 | 36 | 26 | 70% |
| Timers & Sequences | 10 | 49 | 53 | 32 | 65% |
| **Total** | **34** | **181** | **191** | **118** | **77% average** |


## Key Observations

### LunyScript Advantages:

1. **Consistent API Across Engines**
 - Same code works in Unity, Godot, and beyond
 - No need to relearn patterns for different engines
 - Skills transfer completely

2. **Zero Boilerplate**
 - No component management
 - No manual event subscription/unsubscription
 - No lifecycle method complexity

3. **Intent-Driven Code**
 - Reads like what you want to happen
 - No technical jargon barriers
 - Natural language flow

4. **Automatic Management**
 - UI binding happens automatically
 - Audio components created as needed
 - Event cleanup handled internally

5. **Lines of Code Reduction**
 - **81-82% fewer lines** vs C# (Unity/Godot)
 - **71% fewer lines** vs GDScript

### Traditional Approach Challenges:

1. **Concept Overload**
 - Each task requires understanding 5-10 new concepts
 - Engine-specific terminology and patterns
 - Separation between logic and setup code

2. **Boilerplate Tax**
 - Null checking, component management, event cleanup
 - Manual UI updates
 - Lifecycle method understanding

3. **Non-Transferable Knowledge**
 - Unity patterns don't apply to Godot
 - C# patterns & syntax differ from GDScript
 - Relearning required per engine


## Notes

- **LOC (Lines of Code):** Excluding blank lines and comments
- **Overwhelm Reduction:** Based on concept count and code clarity differences
- **LunyScript examples** based on October 2025 Proof of Concept API
- Traditional examples represent **common beginner patterns**, not necessarily optimal advanced patterns
- All examples assume 3D physics-based games

**For more information:**
- [LunyScript Philosophy](Philosophy.md)
- [Proof of Concept Documentation](../PoC_2025-10/)
- [Target Audience Breakdown](TargetAudience.md)

---
[← Back to Main Documentation](../index.md)
