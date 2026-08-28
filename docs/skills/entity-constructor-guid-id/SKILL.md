---
name: entity-constructor-guid-id
description: Use when creating or reviewing C# domain/entity classes that use Guid identity and require ABP-compatible constructors with a protected empty constructor and a public constructor that passes id to base.
---

# Entity Constructor Guid Id

## Overview

This skill enforces a consistent constructor pattern for entity classes using `Guid` as identity.

## Rule

When creating a class that inherits from an ABP entity base class with `Guid` id:

1. Always add a `protected` empty constructor for ORM/serialization needs.
2. Always add a `public` constructor that accepts `Guid id`.
3. The public constructor must call `base(id)`.
4. Always create the corresponding EF Core `Configuration` class for the new entity.
5. Do not create migrations in this step. Configuration only.

## Canonical Pattern

```csharp
public class ProductImage : Entity<Guid>
{
    protected ProductImage()
    {
    }

    public ProductImage(Guid id) : base(id)
    {
    }
}
```

## Extended Pattern (with domain data)

```csharp
public class ProductImage : Entity<Guid>
{
    public string Url { get; private set; }

    protected ProductImage()
    {
    }

    public ProductImage(Guid id, string url) : base(id)
    {
        Url = Check.NotNullOrWhiteSpace(url, nameof(url));
    }
}
```

## Review Checklist

- Class uses `Guid` identity.
- `protected` parameterless constructor exists.
- `public` constructor with `Guid id` exists.
- Public constructor calls `base(id)`.
- Matching EF Core configuration class exists.
- No migration generated as part of this task.
- No duplicate constructor logic.

## Common Mistakes

- Missing protected empty constructor.
- Public constructor sets `Id` manually instead of using `base(id)`.
- Creating migration together with entity creation task (unless explicitly requested).
- Constructor logic duplicated across overloads.
