<script>
		const nombre = prompt('Ingrese nombre:', '');
		const nota = parseInt(prompt('Ingrese su nota:', ''));
		
		// Number.isNaN valida que sea un valor numerico
		if (Number.isNaN(nota)) {
			document.write(`La nota ingresada no es válida`);
		} else if (nota >= 4) {
			document.write(`${nombre} esta aprobado con un ${nota}`);
		} else{
			document.write(`${nombre} NO esta aprobado con un ${nota}`);
		}
</script>