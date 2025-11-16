package com.tripflow.model.types;

import java.util.Set;

public enum ItineraryStatus {
    DRAFT {
        @Override
        public Set<ItineraryStatus> getAllowedTransitions() {
            return Set.of(PLANNED);
        }
    },
    PLANNED {
        @Override
        public Set<ItineraryStatus> getAllowedTransitions() {
            return Set.of(ONGOING);
        }
    },
    ONGOING {
        @Override
        public Set<ItineraryStatus> getAllowedTransitions() {
            return Set.of(COMPLETED);
        }
    },
    COMPLETED {
        @Override
        public Set<ItineraryStatus> getAllowedTransitions() {
            return Set.of();
        }
    };

    public abstract Set<ItineraryStatus> getAllowedTransitions();

    public boolean canTransitionTo(ItineraryStatus newStatus) {
        return this.getAllowedTransitions().contains(newStatus);
    }
}