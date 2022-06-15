import csv
from family_tree.models import Person, Child, Family
from django.contrib.auth import get_user_model
User = get_user_model()


def populate_person():
    path = 'data.csv'
    with open(path, encoding="utf8") as f:
        reader = csv.reader(f)
        for row in reader:
            if Person.objects.filter(pk=row[5]).exists():
                print(row[0])
                print(row[1])
                print(row[5])
                Person.objects.create(
                    id=row[0],
                    name=row[1],
                    pid=row[5],
                    parent_id=row[5],
                    partner=row[7],
                    img=row[0],
                    family=Family.objects.get(pk=2)
                    )
            else:
                print(row[0])
                print(row[1])
                print(row[5])
                Person.objects.create(
                    id=row[0],
                    name=row[1],
                    pid=row[5],
                    parent_id=None,
                    partner=row[7],
                    img=row[0],
                    family=Family.objects.get(pk=2)
                    )



def populate_child():
    path = 'data.csv'
    with open(path, encoding="utf8") as f:
        reader = csv.reader(f)
        for row in reader:
            if Person.objects.filter(pk=row[5]).exists():
                    _, created = Child.objects.get_or_create(
                        id=row[0],
                        name=row[1],
                        img=row[0],
                        parent=Person.objects.get(pk=row[5]),
                        family=Family.objects.get(pk=7)
                        )
                    print(f"{row[0]} created: {created}")
            else:
                print(f"{row[0]} not created")


print("Populating the databases...Please Wait")
#populate_person();
print("Populating Completed")

# select a family
print(Person.objects.all())

# delete all objects
#print(Family.objects.all().delete())

# create a user
#user = User.objects.create_user('Momen', '1'); user.save()

# create a family
#Family.objects.get_or_create(user=(User.objects.get(pk=1)), name='Mawad');

