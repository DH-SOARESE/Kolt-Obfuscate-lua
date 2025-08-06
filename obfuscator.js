function obfuscateLuaU(code) {
  try {
    // 1. Geração de chaves e constantes aleatórias
    const generateRandomName = (prefix = '') =>
      prefix + Math.random().toString(36).substring(2, 10) + '_' + Math.random().toString(36).substring(2, 6);
    
    const randomKeys = {
      xorKey: generateRandomName('k'),
      base64Var: generateRandomName('b'),
      decodeFunc: generateRandomName('d'),
      junkVar1: generateRandomName('v'),
      junkVar2: generateRandomName('w'),
      mainVar: generateRandomName('m')
    };
    
    // 2. Codificação em camadas
    function multiLayerEncode(str) {
      // Primeira camada: XOR com chave dinâmica
      const xorKey1 = Math.random().toString(36).substring(2, 15);
      let xorEncoded = '';
      for (let i = 0; i < str.length; i++) {
        xorEncoded += String.fromCharCode(str.charCodeAt(i) ^ xorKey1.charCodeAt(i % xorKey1.length));
      }
      
      // Segunda camada: Base64
      let base64Encoded = btoa(xorEncoded);
      
      // Terceira camada: Inversão de string
      base64Encoded = base64Encoded.split('').reverse().join('');
      
      return {
        encoded: base64Encoded,
        keys: [xorKey1]
      };
    }
    
    // 3. Ofuscação avançada
    const encodedData = multiLayerEncode(code);
    
    // 4. Geração de código lixo realista
    const generateJunkCode = () => {
      const junkVars = Array.from({ length: 5 }, () => generateRandomName('j'));
      const junkFuncs = Array.from({ length: 3 }, () => generateRandomName('f'));
      
      return `
-- Código de inicialização irrelevante
local ${junkVars[0]} = math.pi
local ${junkVars[1]} = table.concat({"a","b","c"})
local function ${junkFuncs[0]}()
    return tick() * 1000
end

-- Loop de distração
for ${junkVars[2]} = 1, math.random(5, 15) do
    if ${junkVars[2]} % 2 == 0 then
        ${junkVars[3]} = string.reverse(tostring(${junkVars[2]}))
    else
        ${junkVars[4]} = math.floor(${junkFuncs[0]}() / 1000)
    end
end

-- Função não utilizada
local function ${junkFuncs[1]}(...)
    local args = {...}
    return #args > 0 and args[1] or nil
end
`;
    };
    
    // 5. Construção do decoder ofuscado
    const buildDecoder = () => {
      return `
local ${randomKeys.base64Var} = "${encodedData.encoded}"
local ${randomKeys.xorKey} = "${encodedData.keys[0]}"

-- Função de decodificação ofuscada
local function ${randomKeys.decodeFunc}(s, k)
    local r = {}
    local _ = string.reverse
    local __ = table.concat
    local ___ = string.sub
    local ____ = string.byte
    
    for i = 1, #s do
        local c = ____(s, i)
        local kc = ____(k, (i - 1) % #k + 1)
        r[i] = string.char(c ~ kc)
    end
    
    return _(__(r))
end

-- Código de decodificação principal
local ${randomKeys.mainVar} = ${randomKeys.decodeFunc}(
    ${randomKeys.decodeFunc}(${randomKeys.base64Var}, "reverse"),
    ${randomKeys.xorKey}
)

-- Execução segura
local success, err = pcall(function()
    return loadstring(${randomKeys.mainVar})()
end)

if not success then
    warn("Error loading script: " .. err)
end
`;
    };
    
    // 6. Construção final do código ofuscado
    const obfuscatedCode = `
--[[ 
    Código gerado automaticamente - ${new Date().toISOString()} 
    Não modifique este arquivo manualmente
]]--

${generateJunkCode()}

${buildDecoder()}

${generateJunkCode()}
`;
    
    return obfuscatedCode;
  } catch (e) {
    console.error('Obfuscation error:', e);
    throw new Error("Falha na ofuscação: " + e.message);
  }
}
