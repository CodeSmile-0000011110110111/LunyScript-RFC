// Custom C# type highlighter - post-processes after hljs runs
console.log('=== CUSTOM C# HIGHLIGHTER LOADED ===');

// Unity types
const unityTypes = [
    'Vector2', 'Vector3', 'Vector4', 'Vector2Int', 'Vector3Int',
    'Quaternion', 'Matrix4x4', 'Transform', 'GameObject',
    'Component', 'MonoBehaviour', 'ScriptableObject',
    'Rigidbody', 'Rigidbody2D', 'Collider', 'Collider2D',
    'BoxCollider', 'SphereCollider', 'CapsuleCollider', 'MeshCollider',
    'BoxCollider2D', 'CircleCollider2D', 'PolygonCollider2D',
    'Color', 'Color32', 'Texture', 'Texture2D', 'Material', 'Mesh',
    'Camera', 'Light', 'Canvas', 'RectTransform',
    'AudioSource', 'AudioClip', 'Sprite', 'SpriteRenderer',
    'Animator', 'Animation', 'AnimationClip',
    'Input', 'Time', 'Debug', 'Mathf', 'Random',
    'Scene', 'SceneManager', 'UnityEngine', 'UnityEditor',
    'SerializeField', 'HideInInspector', 'Range', 'Tooltip', 'Header',
    'InputAction', 'InputSystem',
    'Awake', 'OnEnable', 'OnDisable', 'Start', 'Update', 'FixedUpdate', 'LateUpdate', 'OnDestroy'
];

// LunyScript types
const lunyScriptTypes = [
    'LunyVector2', 'LunyVector3', 'LunyQuaternion', 'LunyTransform',
    'LunyObject', 'LunyPrefab', 'LunyScene', 'LunyAsset',
    'LunyCollider', 'LunyCollider2D', 'LunyCollision', 'LunyCollision2D',
    'LunyTime', 'LunyMath', 'LunyPath',
    'LunyScript', 'Script', 'ScriptContext', 'ScriptEngine',
    'On', 'FrameUpdate', 'Heartbeat', 'When',
    'Coroutine', 'Timer', 'Counter', 'Physics', 'Collision', 'Trigger',
    'Direction', 'Button', 'Axis',
    'MoveBy', 'MoveUp', 'MoveDown',
    'LunyEngine', 'ILunyEngine', 'Table', 'Variable', 'Number',
    'Alarm', 'Stopwatch', 'ObjectBuilder'
];

const customTypes = [...new Set([...unityTypes, ...lunyScriptTypes])];
customTypes.sort((a, b) => b.length - a.length);

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Create regex pattern for all custom types
const typePattern = new RegExp('\\b(' + customTypes.map(escapeRegex).join('|') + ')\\b', 'g');

const processedBlocks = new WeakSet();

function highlightCustomTypes(codeBlock) {
    if (processedBlocks.has(codeBlock)) {
        return;
    }

    processedBlocks.add(codeBlock);

    // Get the HTML content
    let html = codeBlock.innerHTML;

    // Replace custom type names with highlighted versions
    // We need to avoid replacing inside existing spans or HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (typePattern.test(text)) {
                const span = document.createElement('span');
                span.innerHTML = text.replace(typePattern, '<span class="hljs-type">$1</span>');
                node.parentNode.replaceChild(span, node);

                // Unwrap the temporary span
                while (span.firstChild) {
                    span.parentNode.insertBefore(span.firstChild, span);
                }
                span.parentNode.removeChild(span);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SPAN') {
            Array.from(node.childNodes).forEach(processNode);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
            // Don't recurse into spans, but check if this span's text matches entirely
            if (node.childNodes.length === 1 && node.firstChild.nodeType === Node.TEXT_NODE) {
                const text = node.firstChild.textContent;
                if (customTypes.includes(text)) {
                    node.className = 'hljs-type';
                }
            }
        }
    }

    Array.from(tempDiv.childNodes).forEach(processNode);
    codeBlock.innerHTML = tempDiv.innerHTML;

    console.log('Enhanced code block with custom types');
}

function processAllCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code.lang-csharp, pre code.language-csharp');

    codeBlocks.forEach(block => {
        // Only process if hljs has already highlighted it
        if (block.classList.contains('hljs')) {
            highlightCustomTypes(block);
        }
    });

    if (codeBlocks.length > 0) {
        console.log('=== Processed', codeBlocks.length, 'C# code blocks ===');
    }
}

// Try processing immediately
setTimeout(processAllCodeBlocks, 100);
setTimeout(processAllCodeBlocks, 500);
setTimeout(processAllCodeBlocks, 1000);
setTimeout(processAllCodeBlocks, 2000);
