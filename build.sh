
echo "Building the project..."
python3.12 -m pip install -r requirements.txt || exit 1

echo "Make Migrations..."
python3.12 manage.py makemigrations --noinput || exit 1

echo "Migrate..."
python3.12 manage.py migrate --noinput || exit 1

echo "Collect Static..."
python3.12 manage.py collectstatic --noinput --clear || exit 1

echo "Deployment Ready!"