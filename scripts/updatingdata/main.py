import github
import requests
import json

import yaml
from github import Github, Repository, Branch
from dataclasses import dataclass
from termcolor import colored, cprint
from time import sleep


@dataclass
class Git:
    g: Github
    repo: Repository
    branch: Branch


# noinspection SpellCheckingInspection
def main():
    print("----------------------------------------------------------------------------\n")
    print("Hi! This is a small tool to update JSON files in the scambi.org/data repository!")

    tables_infos = get_tables_infos()
    if type(tables_infos) is not dict:
        return
    # Following infos should be hidden
    git = github_log(user="2ale2", psw="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")
    menu_prompter(git, tables_infos)

    print("\nProcess done. Bye!")


def menu_prompter(git: Git, tables_infos: dict):
    info_text = colored("referenceTableName#1:fileNameToUpdate#1", "light_yellow")
    info_text1 = colored("referenceTableTame#2:fileTameToUpdate#2", "light_blue")
    print("\nPress ENTER to get 'toUpdate.ylm' file from the repo."
          "\nAlternatively, you can:")
    print("\t- Type a comma separated list like\n\t\t" + info_text + "," + info_text1 + ",...")
    print("\t- Send 'list' to get a JSON/CSV files list in the 'scambifestival/scambi.org/data/' directory.")
    print("\t- Send 'tables' to see all the tables I can work with.\n")
    print("\t- Send 'quit' to exit.")
    print("\n----------------------------------------------------------------------------")
    uinput = input()

    while uinput.lower() != "quit":
        if uinput == "help":
            print("----------------------------------------------------------------------------\n")
            sleep(1)
            print("Press ENTER to get 'toUpdate.ylm' file from the repo."
                  "\nAlternatively, you can:")
            print("\t- Type a comma separated list like\n\t\t" + info_text + "," + info_text1 + ",...")
            print("\t- Send 'list' to get a JSON/CSV files list in the 'scambifestival/scambi.org/data/' directory.")
            print("\t- Send 'tables' to see all the tables I can work with.\n")
            print("\t- Send 'quit' to exit.")
            print("\n----------------------------------------------------------------------------\n")
            uinput = input()
        if not uinput:
            source = requests.get(
                "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
            )
            if source.ok:
                yalm_file = yaml.load(source.text, Loader=yaml.Loader)
                print("OK! Those files will be processed:\n")
                count = 1
                to_update = {}
                for item in yalm_file['tables']:
                    key, value = list(item.keys())[0], list(item.values())[0]
                    to_update[key] = value
                    if value == "" or value == " ":
                        print(str(count) + ". '" + key + ".json' (should be created using table w/ reference name '"
                              + key + "')")
                    else:
                        print(str(count) + ". '" + value + "' (should be updated using table w/ reference name '"
                              + key + "')")
                    count += 1
                print("\n(Y) Proceed with updating these tables.")
                print("(N) Go back to the menu.\n")
                uinput = input()
                while uinput.lower() != "y" and uinput.lower() != "n":
                    print("Didn't understand the answer...\n")
                    print("(Y) Proceed with processing these files.")
                    print("(N) Go back to the main menu.\n")
                    uinput = input()
                if uinput.lower() == "y":
                    print()
                    dispatcher(tables_infos, to_update, git)
                    uinput = "quit"
                elif uinput.lower() == "n":
                    uinput = "help"

        elif uinput == "list":
            files = repo_file_getter(git)
            if type(files) is not None:
                print("\nNow you can type a list of space separated numbers to tell which files you want to be updated."
                      "\nAlternatively, you can press ENTER to go back to the main menu.\n")
                uinput = input()
                if uinput == "":
                    uinput = "help"
                else:
                    numbers = uinput.split(" ")
                    numbers = ['{}'.format(number) for number in numbers if number != ""]
                    not_duplicates = []
                    for number in numbers:
                        if uinput != "help":
                            if number not in not_duplicates:
                                while number != "" and not number.isnumeric():
                                    sleep(0.5)
                                    cprint("\nGiven number '" + number + "' has something wrong.\n", "yellow")
                                    sleep(0.8)
                                    print("Please digit it again without any other char.\n"
                                          "Send '0' to ignore this number.\n\n"
                                          "Press ENTER to go back to the main manu.\n")
                                    number = input()
                                if number == "":
                                    uinput = "help"
                                    break
                                elif number == "0":
                                    continue
                                elif number not in not_duplicates:
                                    not_duplicates.append(number)
                                else:
                                    cprint("\n! '" + number + "' will be ignored (it's duplicated).", "yellow")
                                    sleep(0.8)
                            else:
                                cprint("\n! '" + number + "' will be ignored (it's duplicated).", "yellow")
                                sleep(0.8)
                        else:
                            break
                    if uinput != "help":
                        count = 0
                        print("\nOk! so those are the selected files:\n")
                        sleep(0.8)
                        for number in not_duplicates:
                            if number in files:
                                print("\t" + number + ". " + files[number])
                                not_duplicates[count] = files[number]
                                count += 1
                            else:
                                cprint("\t! '" + number + "' ignored (was not in the list)", "yellow")
                            sleep(0.2)
                        not_duplicates = ['{}'.format(el) for el in not_duplicates if not el.isnumeric()]
                        print("\nCan I start processing those files? (Y/N)\n")
                        uinput = input()
                        while uinput.lower() != "y" and uinput.lower() != "n":
                            print("Sorry, didn't understand the answer. "
                                  "Can I proceed with processing those files? (Y/N)")
                            uinput = input()
                        if uinput.lower() == "n":
                            uinput = "help"
                        else:
                            manual_update(tables_infos, git, not_duplicates)
                            uinput = "quit"

        elif uinput == "tables":
            print("\nHere's a list of the tables I can work with:\n")
            sleep(0.5)
            for el in tables_infos:
                print("\t- " + el)
                sleep(0.2)
            sleep(0.6)
            print("\nNow you can:\n\t- Send 'list' to get a JSON/CSV file "
                  "list from the 'data/' folder in the repo.\n\t- Send a comma separated list like:\n\t\t"
                  + info_text + "," + info_text1 + ",...\n\t- Press ENTER to get 'toUpdate.yml' from the repo."
                  "\n\n\t- Send 'quit' to exit.\n")
            uinput = input()

        elif ":" in uinput:
            sleep(0.5)
            names = uinput.split(",")
            count = 0
            for name in names:
                formatted = colored("nomeTabellaDiRiferimento:nomeFileDaAggiornare", "green")
                elems = name.split(":")
                while (len(elems) != 2 or elems[0] == "" or elems[1] == "") and uinput != "help":
                    sleep(0.5)
                    cprint("\nYou gave '" + name + "' wrong formatted.", "yellow")
                    sleep(1)
                    print("\nPlease write it again using this format:\n\n\t" + formatted +
                          "\n\nReference tables names can be found in 'tablesInfos.yml' configuration file.\n\n"
                          "Press ENTER to go back to the main menu.")
                    name = input()
                    if name == "":
                        uinput = "help"
                    else:
                        elems = name.split(":")
                sleep(0.5)
                if uinput != "help":
                    # noinspection PyUnboundLocalVariable
                    elems = ['{0}'.format(elem.removesuffix(" ")) for elem in elems]
                    elems = ['{0}'.format(elem.removeprefix(" ")) for elem in elems]
                    while elems[0] not in tables_infos:
                        sleep(0.5)
                        cprint("\nReference table name '" + elems[0] + "' is not in the 'tablesInfos.yml' file.\n",
                               "yellow")
                        sleep(1)
                        print("Those are the reference names I got:\n")
                        sleep(0.5)
                        for el in tables_infos:
                            print("\t- " + el)
                            sleep(0.2)
                        sleep(0.8)
                        print("\nPlease write the reference table name for '" + elems[1] + "' again.\nPress ENTER to go"
                                                                                           " back to the main menu.\n")
                        uinput = input()
                        if uinput != "":
                            elems[0] = uinput
                        else:
                            uinput = "help"
                            break
                    # noinspection PyUnboundLocalVariable
                    while not elems[1].endswith(".csv") and not elems[1].endswith(".json") and uinput != "help":
                        cprint("\nYou missed a file extension (file: '" + elems[1] + "').", "yellow")
                        sleep(1)
                        print("\nPlease write this filename with its extension ('.json'/'.csv')."
                              "\nPress ENTER to go back to the main menu:\n")
                        uinput = input()
                        if uinput != "":
                            elems[1] = uinput
                            name = elems[0] + ":" + elems[1]
                        else:
                            uinput = "help"
                    names[count] = name
                    count += 1
            if uinput != "help":
                names = sorted(names, key=str.lower)
                set_ = set(names)
                if list(set_) != names:
                    sleep(0.5)
                    print("\nIgnoring duplicates...")
                    sleep(0.5)
                names = list(set_)
                count = 1
                print("\nOk! Those are the files:\n")
                sleep(1)
                for name in names:
                    print("\t" + str(count) + ". " + name.split(":")[1])
                    count += 1
                sleep(1)
                print("\nCan I proceed with the upload?\n")
                print("(Y) Proceed with processing those files.")
                print("(N) Go back to the main menu.\n")
                uinput = input()
                while uinput.lower() != "y" and uinput.lower() != "n":
                    print("\nSorry, didn't understand the answer. Can I proceed with updating those files?")
                    print("(Y) Proceed with processing those files.")
                    print("(N) Go back to the main menu.\n")
                    uinput = input()
                if uinput.lower() == "n":
                    uinput = "help"
                else:
                    manual_update(tables_infos, git, names)
                    uinput = "quit"

        elif uinput == "quit":
            continue

        else:
            print("\nSorry, didn't understand your input.\n")
            uinput = "help"

    if uinput.lower() == "quit":
        return


def github_log(user: str, psw: str):
    g = Github(user, psw)
    repo = g.get_repo("scambifestival/scambi.org")
    git = Git(
        g=g,
        repo=repo,
        branch=repo.get_branch("scripts")
    )
    return git


def manual_update(tables_infos: dict, git: Git, file_names: list):
    flag = True
    json_contents = {}
    file_dict = {}
    for name in file_names:
        if ":" in name:
            coord = name.split(":")
            try:
                git.repo.get_contents("data/{}".format(coord[1]), ref="scripts")
            except github.GithubException as e:
                if e.status == 404:
                    cprint("\nERROR while searching for '" + coord[1] + "' in the repository."
                           "\nThis file seems to not be in the 'data/' folder, so I can't upload it.\n", "red")
                else:
                    cprint("ERROR while trying to get '" + coord[1] + "' in the repository (error code: " +
                           str(e.status) + "). I can't upload it.\n", "red")
                print("Jumping to the next one...\n")
                continue
            print("\n➔ Getting '" + coord[1] + "' new content...")
            sleep(1)
            json_contents[coord[1]] = {}
            json_contents[coord[1]]["content"] = json.dumps(relations(
                                                                      tables_infos[coord[0]],
                                                                      coord[1], coord[1], git, False),
                                                            indent=4, ensure_ascii=False)
            json_contents[coord[1]]["key"] = coord[0]

        else:
            print("\n➔ Getting '" + name + "' new content...")
            sleep(1)
            json_contents[name] = {}
            for i in tables_infos:
                if i in name:
                    cprint("\nI'll use table with reference name '" + i + "' to update '" + name + "' file.\n", "green")
                    sleep(1)
                    print("Press ENTER to confirm.\nSend 'list' to get the reference tables names list.\n")
                    uinput = input()
                    while uinput != "" and uinput.lower() != "list":
                        print("\nSorry, didn't understand your input.\n\n"
                              "Press ENTER to confirm.\nSend 'list' to get the reference tables names list.\n")
                    if uinput != "":
                        print("\nHere's a list of the tables I can work with:\n")
                        sleep(0.5)
                        for el in tables_infos:
                            print("\t- " + el + " (" + tables_infos[el]["name"] + ")")
                            sleep(0.2)
                        sleep(0.6)
                        print("\nTell me reference name of the table you want to use by typing it.\n")
                        uinput = input()
                        while uinput not in tables_infos:
                            cprint("\n'" + uinput + "' is not in the list. Type it again or press CTRL+C to "
                                   "end the program.\n", "yellow")
                            uinput = input()

                        json_contents[name]["content"] = json.dumps(relations(
                                                                               tables_infos[uinput],
                                                                               name, name, git, False),
                                                                    indent=4, ensure_ascii=False)
                        json_contents[name]["key"] = uinput
                    else:
                        json_contents[name]["content"] = json.dumps(relations(tables_infos[i], name, name, git, False),
                                                                    indent=4, ensure_ascii=False)
                        json_contents[name]["key"] = i

            if "content" not in json_contents[name]:
                print("\nWhat is the reference name of the table I should use to update '" + name + "'?")
                print("Send 'list' to get a list tables reference names.\n")
                uinput = input()
                if uinput == "list":
                    print("\nHere's a list of the tables I can work with:\n")
                    sleep(0.5)
                    for el in tables_infos:
                        print("\t- " + el + " (" + tables_infos[el]["name"] + ")")
                        sleep(0.2)
                    sleep(0.6)
                    print("Tell me reference name of the table you want to use by typing it.")
                    uinput = input()
                    while uinput not in tables_infos:
                        cprint("\n'" + uinput + "' is not in the list. Type it again or press CTRL+C to "
                                                "end the program.\n", "yellow")
                        uinput = input()
                json_contents[name]["contents"] = json.dumps(relations(tables_infos[uinput], name, name, git, False),
                                                             indent=4, ensure_ascii=False)
                json_contents[name]["key"] = uinput

    for el in json_contents:
        if el.endswith(".csv"):
            file_dict[json_contents[el]["key"]] = update_file_to_github(git, el, el.removesuffix("csv") + "json",
                                                                        json_contents[el]["key"],
                                                                        json_contents[el]["content"])
        else:
            file_dict[json_contents[el]["key"]] = update_file_to_github(git, el, el, json_contents[el]["key"],
                                                                        json_contents[el]["content"])

    print("➔ All files processed")
    sleep(0.5)
    print("\n➔ Checking the configuration file 'toUpdate.yml'...\n")
    sleep(0.3)
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
    )
    if source.ok:
        yalm_file = yaml.load(source.text, Loader=yaml.Loader)
        to_update = {}
        for item in yalm_file['tables']:
            key, value = list(item.keys())[0], list(item.values())[0]
            to_update[key] = value

        for el in to_update:
            if el not in file_dict:
                file_dict[el] = ""

        for el in file_dict:
            if file_dict[el] is None:
                file_dict[el] = to_update[el]

        for el in file_dict:
            if flag is False:
                break
            if file_dict[el] == "":
                continue
            for el1 in to_update:
                if el == el1:
                    if file_dict[el] == to_update[el1]:
                        break
                    else:
                        toUpdate_updater(file_dict, git)
                        flag = False
                        pass

        if flag is True:
            print("➔ Update to 'toUpdate.yml' not needed (file names didn't changed!)")


def dispatcher(tables_infos: dict, to_update: dict, git: Git):
    new_files = {}
    new_file = None
    for key in to_update:
        if new_file is not None:
            print("Jumping to the next one...\n")
            sleep(1)
        new_file = None
        print("➔ Updating '" + key + "' file using its table...")
        if key not in tables_infos:
            errors_handler(key)

        elif "id" not in tables_infos[key]:
            errors_handler("id")

        elif "view_id" not in tables_infos[key]:
            errors_handler("view_id")

        elif "included" not in tables_infos[key]:
            errors_handler("included")

        elif "filters" not in tables_infos[key]:
            errors_handler("filters")

        else:
            new_file = relations(tables_infos[key], to_update[key], key + ".json", git, True)

        if new_file is not None:
            new_files[key] = new_file
        else:
            new_files[key] = to_update[key]
    print("➔ All files processed")
    sleep(0.5)
    print("\n➔ Checking 'toUpdate.yml' configuration file...")
    if new_files != to_update:
        toUpdate_updater(new_files, git)
    else:
        sleep(0.5)
        print("\n➔ Updating 'toUpdate.yml' not needed (file names didn't change!)")


def relations(tables_infos: dict, file_to_update: str, new_file_name: str,  git: Git, commit: bool):
    url = "https://pino.scambi.org/api/database/rows/table/{}/?user_field_names=true".format(tables_infos["id"])
    params = {"include": tables_infos["included"]}
    key_ = new_file_name[:len(new_file_name)-5]

    if tables_infos["filters"] != "":
        filter_value = tables_infos["filters"].split("=")
        if filter_value[1].isnumeric():
            params[filter_value[0]] = int(filter_value[1])
        else:
            params[filter_value[0]] = filter_value[1]

    if tables_infos["view_id"] != 0:
        params["view_id"] = int(tables_infos["view_id"])

    req = requests.get(
        url=url,
        headers={"Authorization": "Token x9Fc1pCqmmKaDDWf8haWNOkRbhANILMU"},
        params=params
    )

    if req.status_code != 200:
        cprint("\tERROR while gathering '" + tables_infos["name"] + "' table from Pino. The associated file will not "
               "be updated.\n\t" + str(req.headers), "red")
        return

    dict_ = req.json()["results"]

    for sub_dict in dict_:
        if "id" in sub_dict:
            del sub_dict['id']
        if "order" in sub_dict:
            del sub_dict['order']
        for key in sub_dict:
            if type(sub_dict[key]) is list:
                if len(sub_dict[key]) != 0:
                    if "value" in sub_dict[key][0]:
                        sub_dict[key] = sub_dict[key][0]['value']
                else:
                    sub_dict[key] = ""
            elif type(sub_dict[key]) is dict:
                if len(sub_dict[key]) != 0:
                    if "value" in sub_dict[key]:
                        sub_dict[key] = sub_dict[key]["value"]
                    else:
                        sub_dict[key] = ""

    for sub_dict in dict_:
        for key in sub_dict:
            if type(sub_dict[key]) is str:
                if "\n" in sub_dict[key]:
                    sub_dict[key] = text_fixer(sub_dict[key])
    # print(dict_)
    # if "cosa" in sub_dict:
    #     if len(sub_dict['cosa']) != 0:
    #         if "id" in sub_dict['cosa'][0]:
    #             del sub_dict['cosa'][0]['id']
    #         if "color" in sub_dict['cosa'][0]:
    #             del sub_dict['cosa'][0]['color']
    #         sub_dict['cosa'] = sub_dict['cosa'][0]['value']
    # if "stato" in sub_dict:
    #     if "id" in sub_dict['stato']:
    #         del sub_dict['stato']['id']
    #     if "color" in sub_dict['stato']:
    #         del sub_dict['stato']['color']
    #     sub_dict['stato'] = sub_dict['stato']['value']
    # if "referente" in sub_dict:
    #     if len(sub_dict['referente']) != 0:
    #         del sub_dict['referente'][0]['id']
    #         sub_dict['referente'] = sub_dict['referente'][0]['value']

    dict_ = sorted(dict_, key=sorting_key)
    # print(json.dumps(dict_, indent=4, ensure_ascii=False))
    if commit:
        return update_file_to_github(git, file_to_update, new_file_name, key_, json.dumps(dict_, indent=4,
                                                                                          ensure_ascii=False))
    else:
        return dict_


def text_fixer(content: str):
    words = content.split(sep=" ")
    content = ""
    for word in words:
        if "\n" in word:
            word = word.replace("\n", " ")
            word = word.replace("  ", " ")
        if content == "":
            content += word
        else:
            content += " " + word
    return content


def get_tables_infos():
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/tablesInfos.yml"
    )
    if source.ok:
        yaml_file = yaml.load(source.text, Loader=yaml.Loader)
        return yaml_file['tables']
    else:
        cprint("CRITICAL ERROR while parsing 'tablesInfos.yml' file. Please contact @AleLntr on Telegram.", "red")
        return source


def repo_file_getter(git: Git):
    try:
        contents = git.repo.get_contents("/data", ref="scripts")
    except github.GithubException as e:
        cprint("ERROR while trying to get the repository files.\n\t" + str(e.headers), "red")
    else:
        sleep(0.8)
        print("\nHere's a list of the JSON/CSV files (not every file is updatable!):\n")
        count = 1
        files = {}
        for li in contents:
            if li.name.endswith(".csv") or li.name.endswith(".json"):
                sleep(0.2)
                print("\t" + str(count) + ". " + li.name)
                files[str(count)] = li.name
                count += 1
        sleep(0.8)
        return files
    return None


# noinspection PyUnusedLocal,DuplicatedCode
def update_file_to_github(git: Git, old_file_name: str, new_file_name: str, key: str, file_content: str):
    was_csv = False
    update = False
    err_text_y = colored("ERROR", "yellow")
    err_text_r = colored("ERROR", "red")
    script_message = "(SCRIPT MESSAGE) File format not correct: this file needs to be replaced."
    name_to_detect = ""

    sleep(1)
    print("\n➔ Processing '" + new_file_name + "' file...")
    sleep(1)

    if old_file_name != "":
        print("➔ Getting old file content...")
        sleep(1)
        try:
            contents = git.repo.get_contents("data/{}".format(old_file_name), ref="scripts")
        except github.UnknownObjectException as e:
            if e.status == 404:
                cprint("\n\tERROR while trying to get old '" + old_file_name + "'", "yellow")
                cprint("\tGiven file '" + old_file_name + "' was not found in the repository.", "yellow")
                print("\tJumping to the next step...")
                name_to_detect = old_file_name.split(".")[0]
                old_file_name = ""

        except github.GithubException as e:
            cprint("\n\tERROR while trying to get the old '" + old_file_name + "' file content to update.", "red")
            cprint("\tStatus: " + str(e.status) + "\nData: " + str(e.data) + "\nHeaders: " + str(e.headers), "red")
            cprint("\tThis file will not be updated.", "red")

            print("➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.")
            return None
        sleep(1)
    else:
        name_to_detect = new_file_name.split(".")[0] + ".csv"

    if old_file_name.endswith('.csv'):
        was_csv = True
        print("➔ Old file has wrong format (.csv). Deleting it...")
        sleep(1)
        try:
            # noinspection PyUnboundLocalVariable
            deleting_commit = git.repo.delete_file(contents.path, script_message, contents.sha, branch="scripts")
        except github.GithubException as e:
            cprint("\tERROR while trying to delete wrong format '" + old_file_name + "' file.", "yellow")
            cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers),
                   "yellow")
            sleep(0.5)
            cprint("\n\tNOTE: updating the new file will still be attempted.\n", "yellow")
        name_to_detect = old_file_name[:len(old_file_name)-3]
        new_file_name = name_to_detect + "json"
        old_file_name = ""
        sleep(1)

    if not old_file_name.endswith('.csv'):
        if old_file_name != "":
            name_to_detect = old_file_name[:len(old_file_name)-4] + "csv"
        elif was_csv is True:
            name_to_detect = name_to_detect + "csv"
        else:
            name_to_detect = new_file_name[:len(name_to_detect)-4] + "csv"

        try:
            get_csv = git.repo.get_contents("data/{}".format(name_to_detect), ref="scripts")
        except github.GithubException as e:
            if e.status != 404:
                print("\tIn the meantime, I was searching for a CSV file with the same name to ask you to remove it.\n"
                      "\tBy the way an error occurred so I'll ignore this step...")

        else:
            print("➔ CSV file '" + name_to_detect + "' was found in the repository.")
            cprint("\n\tDo you want me to delete it? (Y/N)\n", "yellow")
            uinput = input()
            while uinput.lower() != "y" and uinput.lower() != "n":
                print("\tSorry, didn't understand the answer.\n\tDo want me to delete the detected CSV file? (Y/N)")
                uinput = input()
            if uinput.lower() == "y":
                sleep(0.5)
                print("\n➔ Deleting detected CSV file '" + name_to_detect + "' from the repo...")
                sleep(1)
                try:
                    # noinspection PyUnboundLocalVariable
                    deleting_commit = git.repo.delete_file(get_csv.path, script_message, get_csv.sha, branch="scripts")
                except github.GithubException as e:
                    print("\tERROR while trying to delete '" + name_to_detect + "' detected file.", "yellow")
                else:
                    print("\n➔ '" + name_to_detect + "' correctly deleted from the repo!")
            print("\tJumping to the next step...\n")
            sleep(1)

    if old_file_name == "":
        print("➔ Creating new '" + new_file_name + "' file in the repository...")
        old_file_name = new_file_name
        sleep(1)
        try:
            new_file_commit = git.repo.create_file("data/{}".format(new_file_name),
                                                   "new file (script)",
                                                   file_content,
                                                   branch="scripts")
        except github.GithubException as e:
            if e.status == 422:
                cprint("\n\tERROR while trying to create new '" + new_file_name + "' file. "
                       "There was one already!", "yellow")
                sleep(0.5)
                cprint("\tNo problem, I'm jumping to the next step...", "yellow")
                update = True

            else:
                cprint("\n\tERROR while trying to create '" + new_file_name + "' file.", "red")
                cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers),
                       "red")
                cprint("\tThis file will not be updated.", "red")
                sleep(0.5)
                cprint("\n➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.", "red")
                return None

    if old_file_name != "" or update is True:
        contents = git.repo.get_contents("data/{}".format(old_file_name), ref="scripts")
        print("➔ Updating '" + old_file_name + "' content...")
        sleep(1)
        try:
            updating_commit = git.repo.update_file(contents.path,
                                                   "updating " + old_file_name,
                                                   file_content,
                                                   contents.sha,
                                                   branch="scripts")
        except github.GithubException as e:
            cprint("\n\tERROR while trying to update '" + old_file_name + "' file.", "red")
            cprint("\tStatus: " + str(e.status) + "\n\tData: " + str(e.data) + "\n\tHeaders: " + str(e.headers), "red")
            cprint("\tThis file will not be updated.", "red")
            sleep(0.5)
            print("\n➔ '" + old_file_name + "' NOT updated. Please check manually to fix that.")
            return None

    print("➔ " + old_file_name + " correctly updated!\n")
    sleep(1)
    return old_file_name


def sorting_key(elem):
    return elem[list(elem.keys())[0]]


def toUpdate_updater(new_updated_files: dict, git: Git):
    source = requests.get(
        "https://raw.githubusercontent.com/scambifestival/scambi.org/scripts/scripts/updatingdata/toUpdate.yml"
    )

    if source.ok:
        yaml_file = yaml.load(source.text, Loader=yaml.Loader)
        for el in yaml_file["tables"]:
            key = list(el.keys())[0]
            if new_updated_files[key] != "":
                for el1 in yaml_file["tables"]:
                    if list(el1.keys())[0] == key:
                        el1[list(el1.keys())[0]] = new_updated_files[key]

        yaml_file = yaml.dump(yaml_file)
        tmp_list = yaml_file.split("\n")
        tmp_list = ['{}'.format(el) for el in tmp_list if el != '']
        # tmp_list.pop(len(tmp_list)-1)
        yaml_file = ""
        for word in tmp_list:
            if "tables" not in word:
                sub_list = word.split(": ")
                if "''" not in sub_list[1]:
                    sub_list[1] = "\"" + sub_list[1] + "\""
                else:
                    sub_list[1] = "\"\""
                word = sub_list[0] + ": " + sub_list[1]
            word += "\n"
            if "tables" not in word:
                word = "  " + word
            yaml_file += word
        try:
            contents = git.repo.get_contents("scripts/updatingdata/toUpdate.yml", ref="scripts")
            # noinspection PyUnusedLocal
            update_commit = git.repo.update_file(contents.path, "updating 'toUpdate.yml' configuration file.",
                                                 yaml_file, contents.sha, branch="scripts")
        except github.GithubException as e:
            cprint("\tERROR while updating the 'toUpdate.yml' configuration file.\n"
                   "\tError status:" + str(e.status) + "\tYou'll need to update it by yourself", "red")
        else:
            print("➔ Configuration file updated successfully!")


def errors_handler(value: str):
    sleep(1.2)
    if value != "name" and value != "id" and value != "view_id" and value != "included" and value != "filters":
        cprint("\n\tERROR while getting '" + value + "' table infos."
               "\n\tPlease make sure to use the same word both in 'toUpdate.yml' and in 'tablesInfos.yml'.", "yellow")
        sleep(0.4)
        print("\nJumping to the next table...\n")
    else:
        cprint("\n\tERROR while getting the '" + value + "' info from table infos."
               "\n\tPlease make sure to add all the infos I need in the 'tablesInfos.yml' file.", "yellow")
        sleep(0.4)
        print("\nJumping to the next table...\n")
    sleep(1)


if __name__ == "__main__":
    main()
