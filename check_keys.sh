for FILE in `git diff-index --name-status HEAD -- | cut -c3-` ; do

	if [ ${FILE##*.} = "pem" ] || [ ${FILE##*.} = "ppk" ]
	then
		echo "Found PEM or PPK file... "${FILE}
		exit 1;
	fi

if grep '([A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])' $FILE
		then
			echo "Found a probable key!"
			exit 1;
	fi

if grep -RP '(?<![A-Z0-9])[A-Z0-9]{20,40}(?![A-Z0-9])' $FILE
	then
		echo "Found a probable key!"
		exit 1;
fi
if grep -RP '(?<![A-Za-z0-9+=])[A-Za-z0-9+=]{40,80}(?![A-Za-z0-9+=])' $FILE
	then
		echo "Found a probable key!"
		exit 1;
fi
if grep "BEGIN RSA PRIVATE KEY" $FILE
	then
		echo "Found a probable key!"
		exit 1;
fi

if grep "config.token" $FILE
	then
		echo "Found a probable key!"
		exit 1;
fi

done
