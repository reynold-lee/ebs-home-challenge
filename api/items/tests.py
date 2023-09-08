from rest_framework.test import APITestCase
from items.models import Item


class ItemTestCase(APITestCase):
    apple_item: Item
    shoes_item: Item
    
    apple_data = {
        'id': 1,
        'name': "apple",
        'quantity': 130,
        'location': "SU",
        'notes': "This is notes to be tested"
    }
    shoes_data = {
        'id': 2,
        'name': "shoes",
        'quantity': 60,
        'location': "Store A",
        'notes': ""
    }

    def setUp(self):
        self.apple_item = Item.objects.create(**self.apple_data)
        self.shoes_item = Item.objects.create(**self.shoes_data)


class ItemListTestCase(ItemTestCase):
    def test_item_list(self):
        """Items should be returned by API"""
        res = self.client.get('/api/items/')

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), [
            self.apple_data,
            self.shoes_data
        ])


class ItemCreateTestCase(ItemTestCase):
    def test_item_create(self):
        """Item should be created"""
        creation_data =  {
            "name": "cup",
            "quantity": 3,
            "location": "Store B",
            "notes": "Here's simple notes"
        }
        res = self.client.post('/api/items/', creation_data)

        self.assertEqual(res.status_code, 201)
        self.assertDictContainsSubset(creation_data, res.json())

    def test_name_unique_validate(self):
        """When the name already exists, it should return error"""
        creation_data =  {
            "name": "apple",
            "quantity": 3,
            "location": "Store B",
            "notes": "Here's simple notes"
        }
        res = self.client.post('/api/items/', creation_data)

        self.assertEqual(res.status_code, 400)
        self.assertDictContainsSubset(res.json(), {
            "name": ["item with this name already exists."]
        })


class ItemDeleteTestCase(ItemTestCase):
    def test_item_delete(self):
        """Item should be deleted"""
        res = self.client.delete(f"/api/items/{self.apple_item.id}/")
        retrieved = Item.objects.filter(id=self.apple_item.id).first()

        self.assertEqual(res.status_code, 204)
        self.assertEqual(retrieved, None)

    def test_invalid_delete(self):
        """Should return 404 when id is invalid"""
        res = self.client.delete('/api/items/5/')

        self.assertEqual(res.status_code, 404)



class ItemUpdateTestCase(ItemTestCase):
    def test_item_update(self):
        """Item should be updated"""
        update_data = {
            "id": self.apple_item.id,
            "name": "Apple",
            "quantity": 100,
            "location": "Store X",
            "notes": "This is updated notes",
        }

        res = self.client.put(f'/api/items/{self.apple_item.id}/', update_data)
        db_record = Item.objects.filter(id=self.apple_item.id).first()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), update_data)
        self.assertEqual(db_record, Item(**update_data))

    def test_invalid_update(self):
        """Should return 400 when name is duplicated or id is invalid"""
        update_data = {
            "id": self.apple_item.id,
            "name": "Apple",
            "quantity": 100,
            "location": "Store X",
            "notes": "This is updated notes",
        }

        res = self.client.put('/api/items/5/', update_data)
        self.assertEqual(res.status_code, 404)

        update_data['name'] = self.shoes_item.name
        res = self.client.put(f'/api/items/{self.apple_item.id}/', update_data)
        self.assertEqual(res.status_code, 400)
