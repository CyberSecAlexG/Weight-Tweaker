import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class WeightTweaker implements IPostDBLoadMod
{
    private container: DependencyContainer
    private config = require("../config/config.json")

    public postDBLoad(container: DependencyContainer): void 
    {
        this.container = container
        const tables = this.container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const stamina = tables.globals.config.Stamina

        if (this.config.modCompatibility) 
        {
            stamina.BaseOverweightLimits["x"] *= this.config.cbaseWeightLowerLimit
            stamina.BaseOverweightLimits["y"] *= this.config.cbaseWeightUpperLimit
            stamina.WalkOverweightLimits["x"] *= this.config.cwalkWeightLowerLimit
            stamina.WalkOverweightLimits["y"] *= this.config.cwalkWeightUpperLimit
            stamina.WalkSpeedOverweightLimits["x"] *= this.config.cwalkSpeedWeightLowerLimit
            stamina.WalkSpeedOverweightLimits["y"] *= this.config.cwalkSpeedWeightUpperLimit
            stamina.SprintOverweightLimits["x"] *= this.config.csprintWeightLowerLimit
            stamina.SprintOverweightLimits["y"] *= this.config.csprintWeightUpperLimit
        }
        else
        {
            stamina.BaseOverweightLimits["x"] = this.config.baseWeightLowerLimit
            stamina.BaseOverweightLimits["y"] = this.config.baseWeightUpperLimit
            stamina.WalkOverweightLimits["x"] = this.config.walkWeightLowerLimit
            stamina.WalkOverweightLimits["y"] = this.config.walkWeightUpperLimit
            stamina.WalkSpeedOverweightLimits["x"] = this.config.walkSpeedWeightLowerLimit
            stamina.WalkSpeedOverweightLimits["y"] = this.config.walkSpeedWeightUpperLimit
            stamina.SprintOverweightLimits["x"] = this.config.sprintWeightLowerLimit
            stamina.SprintOverweightLimits["y"] = this.config.sprintWeightUpperLimit
        }
    }
}

module.exports = { mod: new WeightTweaker() }