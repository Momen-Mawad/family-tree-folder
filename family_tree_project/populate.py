import csv
from family_tree.models import Person, Family
from django.contrib.auth import get_user_model
User = get_user_model()

F_PK = 2


def populate_person():
    path = 'family_tables/data_small.csv'
    with open(path, encoding="utf8") as f:
        reader = csv.reader(f)
        for row in reader:
            if Person.objects.filter(id_F=row[2], family=Family.objects.get(pk=F_PK)).exists():
                print(row[1])
                Person.objects.create(
                    id_F=row[0],
                    name=row[1],
                    parent=Person.objects.get(id_F=row[2], family=Family.objects.get(pk=F_PK)),
                    #partner=row[3],
                    img=f"{Family.objects.get(pk=F_PK)}_{row[0]}",
                    family=Family.objects.get(pk=F_PK)
                    )
            else:
                print(row[1])

                Person.objects.create(
                    id_F=row[0],
                    name=row[1],
                    #partner=row[3],
                    img=f"{Family.objects.get(pk=F_PK)}_{row[0]}",
                    family=Family.objects.get(pk=F_PK)
                    )
            print(Person.objects.get(id_F=row[0], family=Family.objects.get(pk=F_PK)).id)

print(Person.objects.filter(family=Family.objects.get(pk=F_PK)).delete()); populate_person();

#print(Person.objects.filter(id_F=0, family=Family.objects.get(pk=2)).exists())

#Person.objects.create(id="3", name="name", parent=Person.objects.create(), family=Family.objects.get(pk=2))

# select a family
#print(Person.objects.filter(id_F=1, family=Family.objects.get(pk=F_PK))[0].family.id)
#print(Family.objects.all())
#print(Person.objects.all())
#print(len(Person.objects.all().filter(family=Family.objects.get(pk=2))))
#print(Family.objects.get(pk=F_PK))
# for i in Family.objects.all():
#     print(i)
#     print(i.pk)

# delete all objects
#Person.objects.all().delete()
#print(Person.objects.filter(family=Family.objects.get(pk=F_PK)).delete())
# User.objects.get(username='amushli')
# user = User.objects.get(username='amushli')
# user.username = 'almushli'
# user.save()

# create a user
#user = User.objects.create_user('Momen', '1'); user.save()

# create a family
#Family.objects.get_or_create(user=(User.objects.get(pk=1)), name='Mawad');

