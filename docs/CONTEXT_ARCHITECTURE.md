# Context Engineering: Clean Architecture & Project Structure

This document defines the architectural standards and structure for the HairGPT project. All AI agents and developers must adhere to these guidelines to maintain code quality, scalability, and consistency.

## 1. Architectural Pattern: Feature-First Clean Architecture (Onion Model)

We follow a **Clean Architecture** approach organized by **Features**. Each feature is a self-contained module containing its own layers.

### Layers Definition

1.  **Domain Layer (Inner Layer)**
    *   **Responsibility:** Contains the business logic and entities. It is independent of external frameworks (React, API, etc.).
    *   **Contents:**
        *   `Entities`: Pure TypeScript interfaces/classes representing business objects.
        *   `Repositories (Interfaces)`: Interfaces defining how data is accessed.
        *   `Use Cases`: Classes/Functions that encapsulate specific business rules/actions.
    *   **Dependencies:** None.

2.  **Data Layer (Middle Layer)**
    *   **Responsibility:** Handles data retrieval and storage. Implements the interfaces defined in the Domain layer.
    *   **Contents:**
        *   `DTOs (Data Transfer Objects)`: **Data Contracts** with external sources (API, DB). They must match the raw response exactly (often `snake_case`).
        *   `Repositories (Implementations)`: Concrete classes that implement Domain Repositories.
        *   `Data Sources`: Logic to connect to APIs, Local Storage, etc.
        *   `Mappers`: **Anti-Corruption Layer**. Functions that convert DTOs to Domain Entities (clean `camelCase`) and vice versa.
    *   **Dependencies:** Domain Layer.

3.  **Presentation Layer (Outer Layer)**
    *   **Responsibility:** Handles UI and User Interaction.
    *   **Contents:**
        *   `Screens`: Top-level components representing a full view.
        *   `Components`: Reusable UI elements specific to the feature.
        *   `ViewModels (Hooks)`: Custom hooks managing state and business logic integration (calling Use Cases).
    *   **Dependencies:** Domain Layer (for Use Cases/Entities).

4.  **Core Layer (`src/core`)**
    *   **Responsibility:** Shared resources, utilities, and generic UI components used across multiple features.
    *   **Contents:** `ui` (Shared Components), `theme` (Colors, Fonts), `services` (Global Services), `hooks` (Global Hooks).

5.  **Dependency Injection (`src/di`)**
    *   **Responsibility:** Manages the instantiation and injection of dependencies (Repositories, Use Cases) to decouple layers.

## 2. Folder Structure

```
src/
├── core/                   # Shared resources
│   ├── theme/              # Design tokens (Colors.ts)
│   ├── ui/                 # Generic, reusable UI components (Buttons, Cards)
│   ├── hooks/              # Shared hooks
│   └── services/           # Global services (Analytics, etc.)
├── features/               # Feature modules
│   ├── [feature_name]/     # e.g., dream_player, onboarding
│   │   ├── data/
│   │   │   ├── dtos/       # Data Contracts (Zod schemas + Types)
│   │   │   ├── mappers/    # DTO -> Entity converters
│   │   │   ├── repositories/
│   │   │   └── datasources/
│   │   ├── domain/
│   │   │   ├── entities/   # or directly in domain root if simple
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── components/
│   │       ├── screens/
│   │       └── hooks/      # ViewModels
├── navigation/             # Navigation configuration
├── di/                     # Dependency Injection setup
└── App.tsx                 # Entry point
```

## 3. Rules for AI Agents & Developers

1.  **Strict Layer Separation:** Never import `Data` layer classes directly into `Presentation`. Always go through `Domain` (Use Cases or Repository Interfaces).
2.  **Feature Isolation:** Keep features independent. If features need to share logic, move it to `src/core` or a shared domain module.
3.  **Dependency Injection:** Always use the DI container to resolve dependencies. Do not instantiate Repositories directly in ViewModels.
4.  **Data Contracts Enforcement:**
    *   **Always use DTOs** to type API responses. Do not use Domain Entities directly for API calls.
    *   **Validation:** Use **Zod** to validate DTOs at runtime. This ensures the app doesn't crash due to unexpected backend changes.
    *   **Mapping:** Always map DTOs (`snake_case`) to Entities (`camelCase`) in the Data Layer.
5.  **File Size Limit:** **Files should generally NOT exceed 100 lines.**
    *   If a file grows beyond this, decompose it.
    *   **Screens:** Split into smaller sub-components (e.g., `HomeHeader`, `HomeFeed`).
    *   **Logic:** Extract complex logic into custom hooks or helper functions.
    *   **Exceptions:** Only allowed for configuration files or strictly necessary boilerplate that cannot be split.
6.  **Documentation Updates:**
    *   **CRITICAL:** If you add a new architectural component (e.g., a new layer, a new way of handling state), implement a new technology (Auth, DB, AI API), or modify the folder structure, **YOU MUST UPDATE THIS DOCUMENT**.
    *   Explain the change, why it was made, and provide examples.

## 5. Implementation Examples

### 1. Data Contract (DTO)
```typescript
// src/features/dream_player/data/dtos/DreamDTO.ts
import { z } from 'zod';

// Zod Schema for Runtime Validation
export const DreamSchema = z.object({
    id: z.string(),
    dream_title: z.string(), // snake_case from Backend
    audio_file_url: z.string(),
    duration_seconds: z.number(),
});

// TypeScript Type inferred from Schema
export type DreamDTO = z.infer<typeof DreamSchema>;
```

### 2. Domain Entity
```typescript
// src/features/dream_player/domain/entities/Dream.ts
export interface Dream {
    id: string;
    title: string; // camelCase for UI
    audioUrl: string;
    duration: number;
}
```

### 3. Mapper (Anti-Corruption Layer)
```typescript
// src/features/dream_player/data/mappers/DreamMapper.ts
import { DreamDTO } from '../dtos/DreamDTO';
import { Dream } from '../../domain/entities/Dream';

export function mapDreamDtoToEntity(dto: DreamDTO): Dream {
    return {
        id: dto.id,
        title: dto.dream_title,
        audioUrl: dto.audio_file_url,
        duration: dto.duration_seconds,
    };
}
```

### 4. Repository Implementation
```typescript
// src/features/dream_player/data/repositories/DreamRepository.ts
import { IDreamRepository } from '../../domain/repositories/IDreamRepository';
import { Dream } from '../../domain/entities/Dream';
import { DreamSchema } from '../dtos/DreamDTO';
import { mapDreamDtoToEntity } from '../mappers/DreamMapper';

export class DreamRepository implements IDreamRepository {
    async getDreamById(id: string): Promise<Dream> {
        // 1. Fetch raw data
        const response = await fetch(`https://api.dreamshift.com/dreams/${id}`);
        const json = await response.json();

        // 2. Validate with Zod (Data Contract)
        const dto = DreamSchema.parse(json);

        // 3. Map to Domain Entity
        return mapDreamDtoToEntity(dto);
    }
}
```

## 4. Current Tech Stack Context
*   **Framework:** React Native (Expo)
*   **Language:** TypeScript
*   **State Management:** Zustand (Global), React Hooks (Local)
*   **Navigation:** React Navigation / Expo Router
*   **Styling:** NativeWind (Tailwind CSS)
