#!/usr/bin/php
<?PHP
echo "Entrez un nombre: ";
while ($line = fgets(STDIN))
{
	$line = trim($line);
	if (!is_numeric($line))
	   echo "'$line' n'est pas un chiffre\n";
	else if ($line % 2 == 0)
   	   echo "Le chiffre $line est Pair\n";
   else   		
   	   echo "Lechiffre $line est Impair\n";
	echo "Entrez un nombre: ";
}
?>