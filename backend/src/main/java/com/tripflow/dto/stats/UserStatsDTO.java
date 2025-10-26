package com.tripflow.dto.stats;

import java.util.List;

public record UserStatsDTO(
    List<StatDTO> stats
) {}