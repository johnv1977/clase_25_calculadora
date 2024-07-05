const { computed, createApp, ref } = Vue

createApp({
  setup() {
    const num1 = ref(null)
    const num2 = ref(null)
    const op = ref('')
    let equalPressed = false

    const numero1 = computed(() => {
      if (!num1.value) return ''

      let numero = parseFloat(num1.value)

      return numero.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
      })
    })

    const numero2 = computed(() => {
      if (!num2.value) return ''

      let numero = parseFloat(num2.value)

      return numero.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
      })
    })

    const result = computed(() => {
      let valor = null

      switch (op.value) {
        case '+':
          valor = (num1.value * 1 ) + (num2.value * 1)
          break
        case '-':
          valor = (num1.value * 1 ) - (num2.value * 1)
          break
        case 'x':
          valor = (num1.value * 1 ) * (num2.value * 1)
          break
        case '/':
          valor = (num2.value == 0) ? null : (num1.value * 1 ) / (num2.value * 1)
          break
        default:
          valor = null
      }

      return valor
    })

    const resultaFormateado = computed(() => {
      return result.value == null
        ? null
        : result.value.toLocaleString('es-CO', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 5
        })
    })

    const sign = computed(() => {
      let icon = ''

      switch (op.value) {
        case '+':
          icon = 'fa-solid fa-plus'
          break
        case '-':
            icon = 'fa-solid fa-minus'
          break
        case 'x':
            icon = 'fa-solid fa-xmark'
            break
        case '/':
          icon = 'fa-solid fa-divide'
          break
        default:
          icon = ''
      }

      return icon
    })

    const angulo1 = computed(() => {
      return (num1.value == null || num1.value.slice === undefined)
        ? 5
        : (parseInt((parseInt(num1.value.slice(0, 2)) * 90) / 99) + 15)
    })

    const angulo2 = computed(() => {
      return (num2.value == null || num2.value.slice === undefined)
        ? -30
        : (parseInt((parseInt(num2.value.slice(0, 2)) * 90) / 99) + 15)
    })

    const angulo3 = computed(() => {
      let n1 = angulo1.value ? Math.abs(angulo1.value) : 1
      let n2 = angulo2.value ? Math.abs(angulo2.value) : 9
      let n3 = (n1 + n2).toString().slice(0,2)

      let value = parseInt((n3 * 180) / 198)

      return (op.value == '')
        ? value
        : value * -1
    })

    const ejeX = computed(() => {
      return (num1.value == null || num1.value.slice === undefined)
        ? '0%'
        : parseInt(num1.value.slice(0, 2)) + '%'
    })
      
    const ejeY = computed(() => {
      return (num2.value == null || num2.value.slice === undefined)
        ? '0%'
        : parseInt(num2.value.slice(0, 2)) + '%'
    })

    function ac(){
      num1.value = null
      num2.value = null
      op.value = ''
    }

    function del(){
      let current = op.value == '' ? num1 : num2

      if (current.value && current.value.length > 0) {
        current.value = current.value.slice(0, -1)
      }
    }

    function dot(){
      if (equalPressed) {
        // Después de igual, reinicia el número
        equalPressed = false
        num1.value = null
      }

      let current = op.value == '' ? num1 : num2
      if (current.value == null) current.value = '0.'

      if (!current.value.includes('.')) {
        current.value = (current.value == null) ? '0.' : current.value + '.'
      }
    }

    function equal() {
      if (num1.value == null || num2.value == null || op.value == '') return ''
      console.log(num1.value + ' ' + op.value + ' ' + num2.value + " = " + result.value)

      num1.value = parseFloat(result.value).toString()
      num2.value = null
      op.value = ''

      equalPressed = true
    }

    function number(num) {
      // Después de igual, le próximo número reinicia
      if (equalPressed) {
        equalPressed = false
        num1.value = null
      }

      // elejimos el número con el cual trabajar
      let current = op.value == '' ? num1 : num2

      let value = parseFloat(current.value)
      if (current.value == '0.' || value > 0) {
        current.value = current.value + num + ''
      } else {
        current.value = num + ''
      }
    }

    function operation(ope) {
      // Después de equal es posible utilizar el
      // resultado para una próxima operación
      if (equalPressed) equalPressed = false
      
      op.value = ope
      if (num1.value == null) num1.value = 0
    }

    return {
      ac,
      angulo1,
      angulo2,
      angulo3,
      del,
      dot,
      ejeX,
      ejeY,
      equal,
      num1,
      num2,
      number,
      numero1,
      numero2,
      op,
      operation,
      result,
      resultaFormateado,
      sign
    }
  }
}).mount('#app')
