import csv
from family_tree.models import Person, Family
from django.contrib.auth import get_user_model
User = get_user_model()


def populate_person():
    path = 'data_small.csv'
    with open(path, encoding="utf8") as f:
        reader = csv.reader(f)
        for row in reader:
            #if not Person.objects.filter(pk=row[0]).exists():
                if Person.objects.filter(pk=row[5]).exists():
                    print(row[0])
                    print(row[1])
                    print(row[5])
                    Person.objects.create(
                        id=row[0],
                        name=row[1],
                        parent=Person.objects.get(pk=row[5]),
                        partner=row[7],
                        img=row[0],
                        family=Family.objects.get(pk=7)
                        )
                else:
                    print(row[0])
                    print(row[1])
                    print(row[5])
                    #Person.objects.create(id=int(row[0])+100000, family=Family.objects.get(pk=2))

                    Person.objects.create(
                        id=row[0],
                        name=row[1],
                        #parent=Person.objects.create(),
                        partner=row[7],
                        img=row[0],
                        family=Family.objects.get(pk=7)
                        )

populate_person()

#Person.objects.create(id="3", name="name", parent=Person.objects.create(), family=Family.objects.get(pk=2))



# select a family
#print(Person.objects.filter(family=Family.objects.get(pk=2)))
#print(Family.objects.all())
#print(len(Person.objects.all().filter(family=Family.objects.get(pk=2))))
#print(Family.objects.get(pk=2))
# for i in Family.objects.all():
#     print(i)
#     print(i.pk)

# delete all objects
#Person.objects.all().delete()
#print(Person.objects.filter(family=Family.objects.get(pk=2)).delete())

# create a user
#user = User.objects.create_user('Momen', '1'); user.save()

# create a family
#Family.objects.get_or_create(user=(User.objects.get(pk=1)), name='Mawad');

