import { SshKeyDTO } from "../dtos/sshkey.dto";
import SshKey from "../models/sshkey.model";

class SettingsService {
  async addSshKey(sshkey: SshKeyDTO) {


    const entity_insert:any = {name: sshkey.name, key: sshkey.key, userId: sshkey.userId}


    const addedkey = await SshKey.create(entity_insert);

    console.log("created sshkey entity from db=", addedkey)

    if(!addedkey)
        return {error:true, message:"Error creating keys in db"}

    try {
      console.log("try write key into git/authorized_keys")
      const fs = require("fs");
      fs.appendFileSync("/home/git/.ssh/authorized_keys", sshkey.key);

      return addedkey;
    } catch(e) {

        console.log("rolling back ",e)

      SshKey.destroy({
        where: {
          name: sshkey.name,
          key: sshkey.key,
          userId: sshkey.userId,
        },
      });

      return {error:true}


    }
  }
  async getSshKeys(userId: number) {
    return await SshKey.findAll({
      where: {
        userId: userId,
      },
    });
  }
}

export default new SettingsService();
