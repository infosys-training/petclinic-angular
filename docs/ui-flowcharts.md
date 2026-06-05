# PetClinic Angular — UI Page Flowcharts

This document describes the navigation flows for every UI page in the PetClinic Angular application. It is formatted for easy copy-paste into Confluence (no Mermaid or special rendering required).

---

## 1. Top-Level Navigation

Source: `src/app/app-routing.module.ts`, `src/app/app.component.html`

```
+------------------+
|   App Shell      |
|   (Navbar)       |
+------------------+
    |
    +--→ /welcome .............. Home (WelcomeComponent)
    |
    +--→ /owners ............... Owners → Search
    |    +--→ /owners/add ...... Owners → Add New
    |
    +--→ /vets ................. Veterinarians → All
    |    +--→ /vets/add ........ Veterinarians → Add New
    |
    +--→ /pettypes ............. Pet Types
    |
    +--→ /specialties .......... Specialties
    |
    +--→ /** ................... Page Not Found (catch-all)
```

---

## 2. Owners Module

Source: `src/app/owners/owners-routing.module.ts`

### Owner List → Detail → Edit / Add Pet

```
+-------------------------------+
| /owners                       |
| OwnerListComponent            |
| - Loads all owners on init    |
| - Search by last name         |
+-------------------------------+
    |                       |
    | click row             | click "Add Owner"
    ↓                       ↓
+-------------------------------+   +-------------------------------+
| /owners/:id                   |   | /owners/add                   |
| OwnerDetailComponent          |   | OwnerAddComponent             |
| - Loads owner by id           |   | - Fill form, submit           |
| - Shows embedded Pets/Visits  |   | - addOwner() → redirects      |
+-------------------------------+   +-------------------------------+
    |           |           |               |
    | "Edit     | "Add New  | "Back"        | on success
    |  Owner"   |  Pet"     |               ↓
    ↓           ↓           ↓       +--→ /owners (list)
+----------------+  +-------------------+
| /owners/:id/  |  | /owners/:id/      |
| edit           |  | pets/add          |
| OwnerEdit      |  | PetAddComponent   |
| Component      |  |                   |
+----------------+  +-------------------+
    |                       |
    | on submit             | on submit
    ↓                       ↓
  /owners/:id             /owners/:ownerId
  (detail)                (detail)
```

### Owner Add

```
+-------------------------------+
| /owners/add                   |
| OwnerAddComponent             |
+-------------------------------+
    |
    | Fill form → submit
    | OwnerService.addOwner()
    ↓
+-------------------------------+
| /owners                       |
| (redirects to owner list)     |
+-------------------------------+
```

### Owner Edit

```
+-------------------------------+
| /owners/:id/edit              |
| OwnerEditComponent            |
| - Loads owner by id           |
+-------------------------------+
    |
    | Edit form → submit
    | OwnerService.updateOwner()
    ↓
+-------------------------------+
| /owners/:id                   |
| (redirects to owner detail)   |
+-------------------------------+
```

---

## 3. Pets Module

Source: `src/app/pets/pets-routing.module.ts`

### Pet Add (from Owner Detail)

```
+-------------------------------+
| /owners/:id/pets/add          |
| PetAddComponent               |
| - Loads pet types             |
| - Loads current owner by id   |
+-------------------------------+
    |
    | Fill name, birthDate, type
    | → submit
    | PetService.addPet()
    ↓
+-------------------------------+
| /owners/:ownerId              |
| (redirects to owner detail)   |
+-------------------------------+
```

### Pet Edit

```
+-------------------------------+
| /pets/:id/edit                |
| PetEditComponent              |
| - Loads pet by id             |
| - Loads pet types             |
| - Loads owner by pet.ownerId  |
+-------------------------------+
    |
    | Edit form → submit
    | PetService.updatePet()
    ↓
+-------------------------------+
| /owners/:ownerId              |
| (redirects to owner detail)   |
+-------------------------------+
```

### PetListComponent (embedded)

```
+-------------------------------+
| PetListComponent              |
| (embedded in OwnerDetail)     |
| - Displays pets for owner     |
+-------------------------------+
    |                   |
    | "Edit Pet"        | "Add Visit"
    ↓                   ↓
  /pets/:id/edit      /pets/:id/visits/add
```

---

## 4. Visits Module

Source: `src/app/visits/visits-routing.module.ts`

### Visit Add (from Pet)

```
+-------------------------------+
| /pets/:id/visits/add          |
| VisitAddComponent             |
| - Loads pet by id             |
| - Loads owner by pet.ownerId  |
+-------------------------------+
    |
    | Fill date, description
    | → submit
    | VisitService.addVisit()
    ↓
+-------------------------------+
| /owners/:ownerId              |
| (redirects to owner detail)   |
+-------------------------------+
```

### VisitListComponent (embedded)

```
+-------------------------------+
| VisitListComponent            |
| (embedded in OwnerDetail      |
|  via PetListComponent)        |
| - Displays visits for a pet   |
+-------------------------------+
    |                   |
    | "Edit"            | "Delete"
    ↓                   ↓
  /visits/:id/edit    VisitService.deleteVisit()
                      → removes from list in-place
```

### Visit Edit

```
+-------------------------------+
| /visits/:id/edit              |
| VisitEditComponent            |
| - Loads visit by id           |
+-------------------------------+
    |
    | Edit form → submit
    | VisitService.updateVisit()
    ↓
+-------------------------------+
| /owners/:ownerId              |
| (redirects to owner detail)   |
+-------------------------------+
```

---

## 5. Veterinarians Module

Source: `src/app/vets/vets-routing.module.ts`

### Vet List → Add / Edit / Delete

```
+-------------------------------+
| /vets                         |
| VetListComponent              |
| - Loads all vets on init      |
+-------------------------------+
    |           |           |
    | "Add Vet" | "Edit"    | "Delete"
    ↓           ↓           ↓
+-------------+ +-----------+ VetService.deleteVet()
| /vets/add   | | /vets/:id | → removes from list
| VetAdd      | | /edit     |
| Component   | | VetEdit   |
+-------------+ | Component |
    |           +-----------+
    | submit        |
    | VetService    | submit
    | .addVet()     | VetService.updateVet()
    ↓               ↓
  /vets           /vets
  (list)          (list)
```

### Vet Add

```
+-------------------------------+
| /vets/add                     |
| VetAddComponent               |
| - Loads specialties list      |
+-------------------------------+
    |
    | Fill name, select specialty
    | → submit
    | VetService.addVet()
    ↓
+-------------------------------+
| /vets                         |
| (redirects to vet list)       |
+-------------------------------+
```

### Vet Edit

```
+-------------------------------+
| /vets/:id/edit                |
| VetEditComponent              |
| - Resolves vet + specialties  |
|   before component init       |
|   (VetResolver, SpecResolver) |
+-------------------------------+
    |
    | Edit form → submit
    | VetService.updateVet()
    ↓
+-------------------------------+
| /vets                         |
| (redirects to vet list)       |
+-------------------------------+
```

---

## 6. Pet Types Module

Source: `src/app/pettypes/pettypes-routing.module.ts`

### Pet Type List → Inline Add / Edit / Delete

```
+-------------------------------+
| /pettypes                     |
| PettypeListComponent          |
| - Loads all pet types on init |
+-------------------------------+
    |           |               |
    | "Add"     | "Edit"        | "Delete"
    | (toggle)  |               |
    ↓           ↓               ↓
+-----------+  +-------------+  PetTypeService.deletePetType()
| Inline    |  | /pettypes/  |  → removes from list
| PettypeAdd|  | :id/edit    |
| Component |  | PettypeEdit |
+-----------+  | Component   |
    |          +-------------+
    | submit        |
    | emits         | submit
    | onNewPettype  | PetTypeService.updatePetType()
    ↓               ↓
  adds to list    /pettypes (list)
  in-place
```

---

## 7. Specialties Module

Source: `src/app/specialties/specialties-routing.module.ts`

### Specialty List → Inline Add / Edit / Delete

```
+-------------------------------+
| /specialties                  |
| SpecialtyListComponent        |
| - Loads all specialties       |
+-------------------------------+
    |           |               |
    | "Add"     | "Edit"        | "Delete"
    | (toggle)  |               |
    ↓           ↓               ↓
+-----------+  +-------------+  SpecialtyService.deleteSpecialty()
| Inline    |  | /specialties| → removes from list
| Specialty |  | /:id/edit   |
| Add       |  | Specialty   |
| Component |  | Edit        |
+-----------+  | Component   |
    |          +-------------+
    | submit        |
    | emits onNew   | submit
    | Specialty     | SpecialtyService.updateSpecialty()
    ↓               ↓
  adds to list    /specialties (list)
  in-place
```

---

## Summary of Patterns

| Pattern                        | Details                                                                                              |
|-------------------------------|------------------------------------------------------------------------------------------------------|
| List pages load on init       | All list components call their service's get method on `ngOnInit` and use `finalize()` for loading state |
| Add pages redirect on success | e.g., OwnerAdd → /owners, VetAdd → /vets, PetAdd → /owners/:id                                      |
| Edit pages redirect on submit | e.g., OwnerEdit → /owners/:id, VetEdit → /vets, PetEdit → /owners/:ownerId                          |
| Inline add for Pet Types & Specialties | These toggle an `isInsert` flag to show/hide a child add component within the list page       |
| Owner Detail is a hub page    | Embeds PetListComponent which embeds VisitListComponent, linking out to pet edit, visit add/edit     |
| Catch-all route               | Any unmatched URL renders PageNotFoundComponent                                                      |

---

## Route Reference Table

| Route                        | Component               | Module       |
|------------------------------|-------------------------|--------------|
| /welcome                    | WelcomeComponent        | App          |
| /owners                     | OwnerListComponent      | Owners       |
| /owners/add                 | OwnerAddComponent       | Owners       |
| /owners/:id                 | OwnerDetailComponent    | Owners       |
| /owners/:id/edit            | OwnerEditComponent      | Owners       |
| /owners/:id/pets/add        | PetAddComponent         | Owners/Pets  |
| /pets/:id/edit              | PetEditComponent        | Pets         |
| /pets/:id/visits/add        | VisitAddComponent       | Pets/Visits  |
| /visits                     | VisitListComponent      | Visits       |
| /visits/:id/edit            | VisitEditComponent      | Visits       |
| /vets                       | VetListComponent        | Vets         |
| /vets/add                   | VetAddComponent         | Vets         |
| /vets/:id/edit              | VetEditComponent        | Vets         |
| /pettypes                   | PettypeListComponent    | Pet Types    |
| /pettypes/add               | PettypeAddComponent     | Pet Types    |
| /pettypes/:id/edit          | PettypeEditComponent    | Pet Types    |
| /specialties                | SpecialtyListComponent  | Specialties  |
| /specialties/:id/edit       | SpecialtyEditComponent  | Specialties  |
| /**                         | PageNotFoundComponent   | App          |
