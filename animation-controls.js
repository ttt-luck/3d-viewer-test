
const animationNames = {
    idle: 'Greeting',
    run: 'SwaggerWalk',
    walk: 'Dancing',
  };
  
  updateAnimationMixer = () => {
  
    const data = {useRegExp: true}
    data.clip = 'none'
    Object.entries(animationNames).forEach((name) => {
  
      const regExpEscape = (s) => {
        return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      }
  
      el = document.getElementById(name[0])
      if (el.checked) {
        if (data.clip) data.clip += "|"
        data.clip += regExpEscape(name[1])
      }
    })
  
    const keys = ['duration',
                  'clampWhenFinished',
                  'loop']
    keys.forEach((key) => {
      const el = document.getElementById(key)
      let value = el.value
  
      const type = AFRAME.components['animation-mixer'].schema[key].type
  
      if (type === 'number' && isNaN(value)) {
        return;
      }
  
      if (type === 'boolean') {
        value = el.checked    
      }
      
      data[key] = value
    })
  
    const target = document.getElementById('trex1')
    target.setAttribute('animation-mixer', data)
  }

  document.addEventListener('DOMContentLoaded', () => {
  
    const inputs = document.querySelectorAll('input, select')
  
    inputs.forEach((input) => {
      input.addEventListener('change', updateAnimationMixer)
      input.addEventListener('click', updateAnimationMixer)
    })
  
    updateAnimationMixer()
  })
