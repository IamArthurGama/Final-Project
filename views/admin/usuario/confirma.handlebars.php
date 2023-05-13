<h3>Confirme sua compra</h3>

<?php

$lanche = $_POST['lanche'];
$preco = $_POST['preco'];
$qtd = $_POST['qtd'];
$total = 0;

echo "<table>
<tr>
<td>Item</td>
<td>Preços</td>
<td>Quantidade</td>
<td>Subtotal</td>
</tr>";





For($i=0; $i<count($lanche); $i++){
    if ($qtd[$i]>0) {
        $subtotal = $qtd[$i] * $preco[$i];
        $total += $subtotal;
        
        echo "<tr>
        <td>".$lanche[$i]."</td>
        <td>R$ ".number_format($preco[$i], 2 ,"," , ".")."</td>
        <td>".$qtd[$i]."</td>
        <td>R$ ".number_format($subtotal, 2 ,"," , ".")."</td>
        </tr>";
    }
}

echo "</table>";
echo "Total pedido R$ " .number_format($total,2,",",".");
?>

